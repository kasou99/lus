import { writeFile } from "node:fs/promises";

const userAgent = "LUS Repair Base X headline updater/1.0";

const googleJa = (query) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ja&gl=JP&ceid=JP:ja`;

const googleEn = (query) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

const xFeeds = [
  "https://news.yahoo.co.jp/rss/topics/top-picks.xml",
  "https://www.nhk.or.jp/rss/news/cat0.xml",
  googleJa("日本 速報 話題 経済 世界情勢 災害 政治 when:1d"),
  googleEn("breaking news geopolitics economy manufacturing technology energy supply chain when:1d")
];

const fallbackItems = [
  {
    time: "確認",
    title: "Xで追いたい主要ニュースを確認",
    source: "Googleニュース",
    url: googleJa("日本 速報 話題 when:1d"),
    xQuery: "日本 速報 話題"
  }
];

const translationCache = new Map();

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .trim();
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return decodeXml(match?.[1] || "");
}

function cleanTitle(title) {
  return decodeXml(title)
    .replace(/\s+-\s+Yahoo!ニュース$/u, "")
    .replace(/\s+-\s+[^-｜|]{2,30}$/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatTime(pubDate) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "速報";
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function sourceFromItem(xml, url) {
  const source = tag(xml, "source");
  if (source) return source;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("yahoo")) return "Yahoo!ニュース";
    if (host.includes("nhk")) return "NHKニュース";
    if (host.includes("news.google")) return "Googleニュース";
    return host;
  } catch {
    return "ニュース";
  }
}

async function readResponseText(response) {
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "";
  const sample = new TextDecoder("ascii").decode(buffer.slice(0, 300));
  const charset = contentType.match(/charset=([^;\s]+)/i)?.[1]
    || sample.match(/encoding=["']([^"']+)["']/i)?.[1]
    || "utf-8";
  const normalized = charset.toLowerCase()
    .replace("shift_jis", "shift-jis")
    .replace("x-sjis", "shift-jis");

  try {
    return new TextDecoder(normalized).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

function parseRss(xml) {
  const matches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return matches.map((entry) => {
    const title = cleanTitle(tag(entry, "title"));
    const url = tag(entry, "link");
    const pubDate = tag(entry, "pubDate");
    return {
      time: formatTime(pubDate),
      title,
      source: sourceFromItem(entry, url),
      url,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : ""
    };
  }).filter((entry) => entry.title && entry.url);
}

async function fetchFeed(url) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return parseRss(await readResponseText(response));
}

function hasJapanese(text) {
  return /[\u3040-\u30ff\u3400-\u9fff]/u.test(String(text || ""));
}

function dedupe(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = entry.title.replace(/[\s　、。,.!！?？:：;；\-ー|｜]/g, "").toLowerCase().slice(0, 48);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function translateTitle(title) {
  const key = title.toLowerCase();
  if (translationCache.has(key)) return translationCache.get(key);

  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.search = new URLSearchParams({ q: title.slice(0, 450), langpair: "en|ja" }).toString();
    const response = await fetch(url, {
      headers: { "user-agent": userAgent },
      signal: globalThis.AbortSignal?.timeout?.(8000)
    });
    if (!response.ok) throw new Error(`translate ${response.status}`);
    const data = await response.json();
    const translated = cleanTitle(data.responseData?.translatedText || "");
    if (translated && translated !== title && hasJapanese(translated)) {
      translationCache.set(key, translated);
      return translated;
    }
  } catch {
    // 翻訳は補助機能なので、失敗時は原文のまま使う。
  }

  translationCache.set(key, title);
  return title;
}

async function normalizeItems(entries) {
  const items = [];
  for (const entry of entries) {
    if (hasJapanese(entry.title)) {
      items.push({ ...entry, xQuery: entry.title });
      continue;
    }

    const title = await translateTitle(entry.title);
    items.push({
      ...entry,
      title,
      originalTitle: title === entry.title ? "" : entry.title,
      translated: title !== entry.title,
      xQuery: entry.title
    });
  }
  return items;
}

function buildXNewsScript(payload) {
  return `window.LUS_X_NEWS = ${JSON.stringify(payload, null, 2)};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = \`
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        \${items.length ? items.map((item) => \`
          <a class="headline-item" href="\${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">\${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">\${escapeX(item.title)}</strong><span class="headline-source">\${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / \${escapeX(item.source || "ニュース")}</span></span>
          </a>
        \`).join("") : \`<p class="headline-error">Xで追う見出しを準備中です。</p>\`}
      </div>
    \`;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
`;
}

async function buildXNews() {
  const settled = await Promise.allSettled(xFeeds.map(fetchFeed));
  const entries = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const merged = dedupe(entries).slice(0, 5);
  const items = await normalizeItems(merged.length ? merged : fallbackItems);
  return { updatedAt: new Date().toISOString(), items };
}

const payload = await buildXNews();
await writeFile("x-news.js", buildXNewsScript(payload), "utf8");
