window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T02:59:32.694Z",
  "items": [
    {
      "time": "09:25",
      "title": "関東・東北 夕方から雨強まる予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591665?source=rss",
      "publishedAt": "2026-08-14T00:25:28.000Z",
      "xQuery": "関東・東北 夕方から雨強まる予想"
    },
    {
      "time": "10:53",
      "title": "千葉駅 一夜明かした家族連れも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591672?source=rss",
      "publishedAt": "2026-08-14T01:53:50.000Z",
      "xQuery": "千葉駅 一夜明かした家族連れも"
    },
    {
      "time": "09:18",
      "title": "帰宅困難の約4千人 自衛隊が輸送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591664?source=rss",
      "publishedAt": "2026-08-14T00:18:28.000Z",
      "xQuery": "帰宅困難の約4千人 自衛隊が輸送"
    },
    {
      "time": "10:35",
      "title": "広い範囲で浸水 上空からの映像",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591668?source=rss",
      "publishedAt": "2026-08-14T01:35:24.000Z",
      "xQuery": "広い範囲で浸水 上空からの映像"
    },
    {
      "time": "10:21",
      "title": "パワハラの横浜市長 市議追及に涙",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591670?source=rss",
      "publishedAt": "2026-08-14T01:21:02.000Z",
      "xQuery": "パワハラの横浜市長 市議追及に涙"
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
