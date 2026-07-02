window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T11:00:12.011Z",
  "items": [
    {
      "time": "19:13",
      "title": "日印 経済安保の協力強化で一致",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586502?source=rss",
      "publishedAt": "2026-07-02T10:13:42.000Z",
      "xQuery": "日印 経済安保の協力強化で一致"
    },
    {
      "time": "18:17",
      "title": "皇室典範改正案 宮内庁がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586492?source=rss",
      "publishedAt": "2026-07-02T09:17:17.000Z",
      "xQuery": "皇室典範改正案 宮内庁がコメント"
    },
    {
      "time": "19:05",
      "title": "個人株主 初の延べ9000万人超え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586499?source=rss",
      "publishedAt": "2026-07-02T10:05:59.000Z",
      "xQuery": "個人株主 初の延べ9000万人超え"
    },
    {
      "time": "18:58",
      "title": "滝つぼで発見の10歳 死因は溺死",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586500?source=rss",
      "publishedAt": "2026-07-02T09:58:06.000Z",
      "xQuery": "滝つぼで発見の10歳 死因は溺死"
    },
    {
      "time": "19:12",
      "title": "2歳虐待死 親が娘を「あほ」呼び",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586501?source=rss",
      "publishedAt": "2026-07-02T10:12:28.000Z",
      "xQuery": "2歳虐待死 親が娘を「あほ」呼び"
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
