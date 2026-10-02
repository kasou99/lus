window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T14:20:16.194Z",
  "items": [
    {
      "time": "23:04",
      "title": "プルデンシャルの処分検討 金融庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597329?source=rss",
      "publishedAt": "2026-10-02T14:04:42.000Z",
      "xQuery": "プルデンシャルの処分検討 金融庁"
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
      "time": "22:54",
      "title": "情報漏えい相次ぐ「異様」と識者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597326?source=rss",
      "publishedAt": "2026-10-02T13:54:01.000Z",
      "xQuery": "情報漏えい相次ぐ「異様」と識者"
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
