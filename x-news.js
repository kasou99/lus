window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T04:32:14.703Z",
  "items": [
    {
      "time": "12:16",
      "title": "皇室典範改正案 参院で審議始まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588014?source=rss",
      "publishedAt": "2026-07-15T03:16:19.000Z",
      "xQuery": "皇室典範改正案 参院で審議始まる"
    },
    {
      "time": "11:27",
      "title": "2歳虐待死 両親に拘禁刑8年判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588003?source=rss",
      "publishedAt": "2026-07-15T02:27:07.000Z",
      "xQuery": "2歳虐待死 両親に拘禁刑8年判決"
    },
    {
      "time": "12:28",
      "title": "集団登校中 女児はねられ意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588020?source=rss",
      "publishedAt": "2026-07-15T03:28:44.000Z",
      "xQuery": "集団登校中 女児はねられ意識不明"
    },
    {
      "time": "11:14",
      "title": "イオンでも一部欠品 ニチレイ障害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588002?source=rss",
      "publishedAt": "2026-07-15T02:14:42.000Z",
      "xQuery": "イオンでも一部欠品 ニチレイ障害"
    },
    {
      "time": "10:53",
      "title": "宮崎麗果被告に有罪 1.5億円脱税",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587999?source=rss",
      "publishedAt": "2026-07-15T01:53:40.000Z",
      "xQuery": "宮崎麗果被告に有罪 1.5億円脱税"
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
