window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T23:56:40.156Z",
  "items": [
    {
      "time": "08:51",
      "title": "米軍 イランの複数標的を空爆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585957?source=rss",
      "publishedAt": "2026-06-27T23:51:17.000Z",
      "xQuery": "米軍 イランの複数標的を空爆"
    },
    {
      "time": "08:47",
      "title": "関東 少しの雨でも土砂災害に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585955?source=rss",
      "publishedAt": "2026-06-27T23:47:16.000Z",
      "xQuery": "関東 少しの雨でも土砂災害に注意"
    },
    {
      "time": "08:03",
      "title": "育休なら学童退所 主要自治体6割",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585951?source=rss",
      "publishedAt": "2026-06-27T23:03:11.000Z",
      "xQuery": "育休なら学童退所 主要自治体6割"
    },
    {
      "time": "07:55",
      "title": "車横転2人死亡 運転の高校生逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585947?source=rss",
      "publishedAt": "2026-06-27T22:55:52.000Z",
      "xQuery": "車横転2人死亡 運転の高校生逮捕"
    },
    {
      "time": "08:17",
      "title": "床に食べ物「3秒ルール」真実は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585952?source=rss",
      "publishedAt": "2026-06-27T23:17:23.000Z",
      "xQuery": "床に食べ物「3秒ルール」真実は"
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
