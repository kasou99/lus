window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T06:11:50.669Z",
  "items": [
    {
      "time": "13:13",
      "title": "千葉豪雨 被災車両巡りトラブル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592642?source=rss",
      "publishedAt": "2026-08-22T04:13:51.000Z",
      "xQuery": "千葉豪雨 被災車両巡りトラブル"
    },
    {
      "time": "14:29",
      "title": "原爆「包帯の少女」の証言公開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592651?source=rss",
      "publishedAt": "2026-08-22T05:29:47.000Z",
      "xQuery": "原爆「包帯の少女」の証言公開へ"
    },
    {
      "time": "14:39",
      "title": "USJでコースター停止 けが人なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592653?source=rss",
      "publishedAt": "2026-08-22T05:39:25.000Z",
      "xQuery": "USJでコースター停止 けが人なし"
    },
    {
      "time": "13:35",
      "title": "果物大量盗難は組織的犯行か 識者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592645?source=rss",
      "publishedAt": "2026-08-22T04:35:43.000Z",
      "xQuery": "果物大量盗難は組織的犯行か 識者"
    },
    {
      "time": "14:37",
      "title": "食パン投棄 鳥取市の海岸でも?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592652?source=rss",
      "publishedAt": "2026-08-22T05:37:11.000Z",
      "xQuery": "食パン投棄 鳥取市の海岸でも?"
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
