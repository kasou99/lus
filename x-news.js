window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T06:47:45.931Z",
  "items": [
    {
      "time": "14:51",
      "title": "ICCなど巡る高市外交「弱腰」批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592655?source=rss",
      "publishedAt": "2026-08-22T05:51:29.000Z",
      "xQuery": "ICCなど巡る高市外交「弱腰」批判"
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
      "time": "13:13",
      "title": "千葉豪雨 被災車両巡りトラブル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592642?source=rss",
      "publishedAt": "2026-08-22T04:13:51.000Z",
      "xQuery": "千葉豪雨 被災車両巡りトラブル"
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
      "time": "15:28",
      "title": "55億円で買った山 県なぜ27年放置",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592658?source=rss",
      "publishedAt": "2026-08-22T06:28:00.000Z",
      "xQuery": "55億円で買った山 県なぜ27年放置"
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
