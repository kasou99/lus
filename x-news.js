window.LUS_X_NEWS = {
  "updatedAt": "2026-11-27T09:12:59.639Z",
  "items": [
    {
      "time": "17:06",
      "title": "政府 防災の「国家戦略」を初策定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604199?source=rss",
      "publishedAt": "2026-11-27T08:06:09.000Z",
      "xQuery": "政府 防災の「国家戦略」を初策定"
    },
    {
      "time": "17:15",
      "title": "関東など 朝にかけ大雨になる所も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604206?source=rss",
      "publishedAt": "2026-11-27T08:15:34.000Z",
      "xQuery": "関東など 朝にかけ大雨になる所も"
    },
    {
      "time": "17:24",
      "title": "問責案否決 自民議員も関氏に苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604205?source=rss",
      "publishedAt": "2026-11-27T08:24:06.000Z",
      "xQuery": "問責案否決 自民議員も関氏に苦言"
    },
    {
      "time": "14:59",
      "title": "第3子以降出産で1千万円 自民が案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604188?source=rss",
      "publishedAt": "2026-11-27T05:59:41.000Z",
      "xQuery": "第3子以降出産で1千万円 自民が案"
    },
    {
      "time": "17:08",
      "title": "神崎武法さんが死去 選挙CM話題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604203?source=rss",
      "publishedAt": "2026-11-27T08:08:59.000Z",
      "xQuery": "神崎武法さんが死去 選挙CM話題"
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
