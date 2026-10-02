window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T13:43:07.383Z",
  "items": [
    {
      "time": "20:43",
      "title": "津市で火災 焼け跡から4人の遺体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597318?source=rss",
      "publishedAt": "2026-10-02T11:43:10.000Z",
      "xQuery": "津市で火災 焼け跡から4人の遺体"
    },
    {
      "time": "20:46",
      "title": "東北3地銀 28年4月統合向け協議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597317?source=rss",
      "publishedAt": "2026-10-02T11:46:40.000Z",
      "xQuery": "東北3地銀 28年4月統合向け協議へ"
    },
    {
      "time": "20:20",
      "title": "日本が対露制裁「影の船団」対象",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597316?source=rss",
      "publishedAt": "2026-10-02T11:20:28.000Z",
      "xQuery": "日本が対露制裁「影の船団」対象"
    },
    {
      "time": "18:49",
      "title": "佐川急便 宅配便平均13%値上げへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597309?source=rss",
      "publishedAt": "2026-10-02T09:49:13.000Z",
      "xQuery": "佐川急便 宅配便平均13%値上げへ"
    },
    {
      "time": "20:10",
      "title": "スガキヤが「ドムドム」子会社化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597315?source=rss",
      "publishedAt": "2026-10-02T11:10:40.000Z",
      "xQuery": "スガキヤが「ドムドム」子会社化"
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
