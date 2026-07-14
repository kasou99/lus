window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T23:49:49.213Z",
  "items": [
    {
      "time": "08:37",
      "title": "北陸新幹線延伸「桂川」案に決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587983?source=rss",
      "publishedAt": "2026-07-14T23:37:27.000Z",
      "xQuery": "北陸新幹線延伸「桂川」案に決定"
    },
    {
      "time": "06:44",
      "title": "米軍 イランの港湾封鎖を再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587969?source=rss",
      "publishedAt": "2026-07-14T21:44:05.000Z",
      "xQuery": "米軍 イランの港湾封鎖を再開"
    },
    {
      "time": "07:51",
      "title": "東日本を中心に猛暑日予想 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587976?source=rss",
      "publishedAt": "2026-07-14T22:51:33.000Z",
      "xQuery": "東日本を中心に猛暑日予想 警戒を"
    },
    {
      "time": "07:27",
      "title": "GMO在宅勤務を完全廃止 狙いは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587973?source=rss",
      "publishedAt": "2026-07-14T22:27:02.000Z",
      "xQuery": "GMO在宅勤務を完全廃止 狙いは"
    },
    {
      "time": "07:49",
      "title": "KFC なぜ品切れや臨時休業の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587975?source=rss",
      "publishedAt": "2026-07-14T22:49:04.000Z",
      "xQuery": "KFC なぜ品切れや臨時休業の恐れ"
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
