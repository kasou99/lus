window.LUS_X_NEWS = {
  "updatedAt": "2026-10-19T04:47:06.814Z",
  "items": [
    {
      "time": "12:06",
      "title": "プーチン氏が米中露会談提案 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599341?source=rss",
      "publishedAt": "2026-10-19T03:06:14.000Z",
      "xQuery": "プーチン氏が米中露会談提案 報道"
    },
    {
      "time": "09:49",
      "title": "道府県立高145校減か 40年度まで",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599324?source=rss",
      "publishedAt": "2026-10-19T00:49:24.000Z",
      "xQuery": "道府県立高145校減か 40年度まで"
    },
    {
      "time": "11:35",
      "title": "「子2人目望む」が過去最低 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599334?source=rss",
      "publishedAt": "2026-10-19T02:35:07.000Z",
      "xQuery": "「子2人目望む」が過去最低 調査"
    },
    {
      "time": "13:34",
      "title": "バスや乗用車からむ事故 14人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599349?source=rss",
      "publishedAt": "2026-10-19T04:34:14.000Z",
      "xQuery": "バスや乗用車からむ事故 14人搬送"
    },
    {
      "time": "11:02",
      "title": "ダンプカーが穴に転落 心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599332?source=rss",
      "publishedAt": "2026-10-19T02:02:03.000Z",
      "xQuery": "ダンプカーが穴に転落 心肺停止"
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
