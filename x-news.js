window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T00:20:14.546Z",
  "items": [
    {
      "time": "09:12",
      "title": "日豪 長射程ミサイル試験で協力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592246?source=rss",
      "publishedAt": "2026-08-19T00:12:44.000Z",
      "xQuery": "日豪 長射程ミサイル試験で協力"
    },
    {
      "time": "09:04",
      "title": "OpenAIの2人語る 注目の職種FDE",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592242?source=rss",
      "publishedAt": "2026-08-19T00:04:04.000Z",
      "xQuery": "OpenAIの2人語る 注目の職種FDE"
    },
    {
      "time": "08:03",
      "title": "イランが弾道ミサイル UAE発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592237?source=rss",
      "publishedAt": "2026-08-18T23:03:46.000Z",
      "xQuery": "イランが弾道ミサイル UAE発表"
    },
    {
      "time": "08:45",
      "title": "竹中工務店の万博現場責任者 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592243?source=rss",
      "publishedAt": "2026-08-18T23:45:27.000Z",
      "xQuery": "竹中工務店の万博現場責任者 逮捕"
    },
    {
      "time": "08:15",
      "title": "高校生3人連携 池で溺れる3人救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592241?source=rss",
      "publishedAt": "2026-08-18T23:15:38.000Z",
      "xQuery": "高校生3人連携 池で溺れる3人救助"
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
