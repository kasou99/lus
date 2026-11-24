window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T23:09:31.742Z",
  "items": [
    {
      "time": "06:51",
      "title": "副首都 来年秋に複数同時に指定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603860?source=rss",
      "publishedAt": "2026-11-24T21:51:04.000Z",
      "xQuery": "副首都 来年秋に複数同時に指定"
    },
    {
      "time": "07:36",
      "title": "財政難の兵庫県 新庁舎面積削減へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603862?source=rss",
      "publishedAt": "2026-11-24T22:36:00.000Z",
      "xQuery": "財政難の兵庫県 新庁舎面積削減へ"
    },
    {
      "time": "07:37",
      "title": "広島女性死亡 強盗殺人疑い男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603863?source=rss",
      "publishedAt": "2026-11-24T22:37:56.000Z",
      "xQuery": "広島女性死亡 強盗殺人疑い男逮捕"
    },
    {
      "time": "07:54",
      "title": "米で鳥インフルに3人感染 WHO",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603865?source=rss",
      "publishedAt": "2026-11-24T22:54:06.000Z",
      "xQuery": "米で鳥インフルに3人感染 WHO"
    },
    {
      "time": "23:55",
      "title": "逆走車に衝突されたか 運転手死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603855?source=rss",
      "publishedAt": "2026-11-24T14:55:44.000Z",
      "xQuery": "逆走車に衝突されたか 運転手死亡"
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
