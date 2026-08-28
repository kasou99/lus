window.LUS_X_NEWS = {
  "updatedAt": "2026-08-28T19:32:45.280Z",
  "items": [
    {
      "time": "00:05",
      "title": "FRBによる9月利​上げ観測高まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593460?source=rss",
      "publishedAt": "2026-08-28T15:05:19.000Z",
      "xQuery": "FRBによる9月利​上げ観測高まる"
    },
    {
      "time": "22:14",
      "title": "熊本県 地震による水道の断水解消",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593449?source=rss",
      "publishedAt": "2026-08-28T13:14:42.000Z",
      "xQuery": "熊本県 地震による水道の断水解消"
    },
    {
      "time": "22:27",
      "title": "姿見せないモジタバ師 深まる疑念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593454?source=rss",
      "publishedAt": "2026-08-28T13:27:15.000Z",
      "xQuery": "姿見せないモジタバ師 深まる疑念"
    },
    {
      "time": "22:59",
      "title": "ネパールで不明の邦人 小学生も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593457?source=rss",
      "publishedAt": "2026-08-28T13:59:17.000Z",
      "xQuery": "ネパールで不明の邦人 小学生も"
    },
    {
      "time": "22:17",
      "title": "飲酒事故で2児失う 耳残る泣き声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593450?source=rss",
      "publishedAt": "2026-08-28T13:17:37.000Z",
      "xQuery": "飲酒事故で2児失う 耳残る泣き声"
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
