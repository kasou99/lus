window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T06:51:16.822Z",
  "items": [
    {
      "time": "13:25",
      "title": "消費減税法案 自民が譲歩に含み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599227?source=rss",
      "publishedAt": "2026-10-18T04:25:22.000Z",
      "xQuery": "消費減税法案 自民が譲歩に含み"
    },
    {
      "time": "14:12",
      "title": "福生市で男性刺され死亡 男を確保",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599233?source=rss",
      "publishedAt": "2026-10-18T05:12:15.000Z",
      "xQuery": "福生市で男性刺され死亡 男を確保"
    },
    {
      "time": "13:46",
      "title": "図書館で車が2人はねる 57歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599231?source=rss",
      "publishedAt": "2026-10-18T04:46:41.000Z",
      "xQuery": "図書館で車が2人はねる 57歳死亡"
    },
    {
      "time": "15:37",
      "title": "水路にうどん捨てないで 看板の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599244?source=rss",
      "publishedAt": "2026-10-18T06:37:21.000Z",
      "xQuery": "水路にうどん捨てないで 看板の訳"
    },
    {
      "time": "15:09",
      "title": "井脇ノブ子氏 ピンクスーツは47着",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599241?source=rss",
      "publishedAt": "2026-10-18T06:09:35.000Z",
      "xQuery": "井脇ノブ子氏 ピンクスーツは47着"
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
