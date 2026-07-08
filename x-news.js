window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T03:11:16.336Z",
  "items": [
    {
      "time": "11:15",
      "title": "九州北部・中国・近畿で梅雨明け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587139?source=rss",
      "publishedAt": "2026-07-08T02:15:52.000Z",
      "xQuery": "九州北部・中国・近畿で梅雨明け"
    },
    {
      "time": "08:07",
      "title": "仏極右ルペン氏 大統領選出馬表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587123?source=rss",
      "publishedAt": "2026-07-07T23:07:05.000Z",
      "xQuery": "仏極右ルペン氏 大統領選出馬表明"
    },
    {
      "time": "10:55",
      "title": "2歳虐待死 両親に拘禁刑9年求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587136?source=rss",
      "publishedAt": "2026-07-08T01:55:51.000Z",
      "xQuery": "2歳虐待死 両親に拘禁刑9年求刑"
    },
    {
      "time": "10:27",
      "title": "絵本作家・林明子さんが死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587135?source=rss",
      "publishedAt": "2026-07-08T01:27:10.000Z",
      "xQuery": "絵本作家・林明子さんが死去"
    },
    {
      "time": "11:47",
      "title": "ハンガリー 公共放送「うそ」謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587143?source=rss",
      "publishedAt": "2026-07-08T02:47:48.000Z",
      "xQuery": "ハンガリー 公共放送「うそ」謝罪"
    }
  ]
};

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
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
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
