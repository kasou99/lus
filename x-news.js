window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T22:30:10.218Z",
  "items": [
    {
      "time": "06:47",
      "title": "イラン イスラエルへミサイル発射",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583360?source=rss",
      "publishedAt": "2026-06-07T21:47:18.000Z",
      "xQuery": "イラン イスラエルへミサイル発射"
    },
    {
      "time": "07:28",
      "title": "習近平主席 きょう7年ぶり訪朝へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583364?source=rss",
      "publishedAt": "2026-06-07T22:28:16.000Z",
      "xQuery": "習近平主席 きょう7年ぶり訪朝へ"
    },
    {
      "time": "06:21",
      "title": "女児1人で来店と通報 母と男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583357?source=rss",
      "publishedAt": "2026-06-07T21:21:55.000Z",
      "xQuery": "女児1人で来店と通報 母と男逮捕"
    },
    {
      "time": "06:39",
      "title": "ボンネットに店員乗せ走行 車逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583359?source=rss",
      "publishedAt": "2026-06-07T21:39:44.000Z",
      "xQuery": "ボンネットに店員乗せ走行 車逃走"
    },
    {
      "time": "07:16",
      "title": "クマ 宇都宮市立の全小中学休校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583362?source=rss",
      "publishedAt": "2026-06-07T22:16:56.000Z",
      "xQuery": "クマ 宇都宮市立の全小中学休校"
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
