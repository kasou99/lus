window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T21:37:06.476Z",
  "items": [
    {
      "time": "04:58",
      "title": "命守って 福井県に大雨特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593577?source=rss",
      "publishedAt": "2026-08-29T19:58:11.000Z",
      "xQuery": "命守って 福井県に大雨特別警報"
    },
    {
      "time": "06:14",
      "title": "大雨で浸水リスク 車移動は危険",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593582?source=rss",
      "publishedAt": "2026-08-29T21:14:58.000Z",
      "xQuery": "大雨で浸水リスク 車移動は危険"
    },
    {
      "time": "06:23",
      "title": "福井県に大雨特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593581?source=rss",
      "publishedAt": "2026-08-29T21:23:53.000Z",
      "xQuery": "福井県に大雨特別警報 最新情報"
    },
    {
      "time": "04:59",
      "title": "安全確保を 大雨のときのNG行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593206?source=rss",
      "publishedAt": "2026-08-29T19:59:00.000Z",
      "xQuery": "安全確保を 大雨のときのNG行動"
    },
    {
      "time": "06:10",
      "title": "福井県で大雨 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593583?source=rss",
      "publishedAt": "2026-08-29T21:10:07.000Z",
      "xQuery": "福井県で大雨 現地のSNS投稿"
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
