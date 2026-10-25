window.LUS_X_NEWS = {
  "updatedAt": "2026-10-25T07:18:12.201Z",
  "items": [
    {
      "time": "14:15",
      "title": "近畿で非常に激しい雨 26日も警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600051?source=rss",
      "publishedAt": "2026-10-25T05:15:44.000Z",
      "xQuery": "近畿で非常に激しい雨 26日も警戒"
    },
    {
      "time": "15:32",
      "title": "衆院議席減案 国民民主の賛否焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600059?source=rss",
      "publishedAt": "2026-10-25T06:32:24.000Z",
      "xQuery": "衆院議席減案 国民民主の賛否焦点"
    },
    {
      "time": "15:13",
      "title": "那覇市の女性強殺事件 米兵を起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600057?source=rss",
      "publishedAt": "2026-10-25T06:13:16.000Z",
      "xQuery": "那覇市の女性強殺事件 米兵を起訴"
    },
    {
      "time": "15:30",
      "title": "和菓子店主殺害 強殺疑い2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600058?source=rss",
      "publishedAt": "2026-10-25T06:30:23.000Z",
      "xQuery": "和菓子店主殺害 強殺疑い2人逮捕"
    },
    {
      "time": "13:47",
      "title": "床はう患者撮影し投稿 法的責任は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600047?source=rss",
      "publishedAt": "2026-10-25T04:47:17.000Z",
      "xQuery": "床はう患者撮影し投稿 法的責任は"
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
