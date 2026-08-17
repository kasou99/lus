window.LUS_X_NEWS = {
  "updatedAt": "2026-08-17T21:09:47.997Z",
  "items": [
    {
      "time": "23:19",
      "title": "熊本地震3週間「関連死」防ぐには",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592118?source=rss",
      "publishedAt": "2026-08-17T14:19:11.000Z",
      "xQuery": "熊本地震3週間「関連死」防ぐには"
    },
    {
      "time": "22:36",
      "title": "豪雨で車が浸水 金銭負担が心配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592117?source=rss",
      "publishedAt": "2026-08-17T13:36:51.000Z",
      "xQuery": "豪雨で車が浸水 金銭負担が心配"
    },
    {
      "time": "20:48",
      "title": "9日に流され行方不明の女性 救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592108?source=rss",
      "publishedAt": "2026-08-17T11:48:39.000Z",
      "xQuery": "9日に流され行方不明の女性 救助"
    },
    {
      "time": "23:03",
      "title": "踏切開いたまま電車通過 東急電鉄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592116?source=rss",
      "publishedAt": "2026-08-17T14:03:44.000Z",
      "xQuery": "踏切開いたまま電車通過 東急電鉄"
    },
    {
      "time": "20:17",
      "title": "ロケットナウ つまみ食い動画拡散",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592103?source=rss",
      "publishedAt": "2026-08-17T11:17:11.000Z",
      "xQuery": "ロケットナウ つまみ食い動画拡散"
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
