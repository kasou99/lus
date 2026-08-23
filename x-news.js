window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T03:24:42.051Z",
  "items": [
    {
      "time": "10:39",
      "title": "文科省 来年度科研費を倍増要求へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592747?source=rss",
      "publishedAt": "2026-08-23T01:39:32.000Z",
      "xQuery": "文科省 来年度科研費を倍増要求へ"
    },
    {
      "time": "08:14",
      "title": "ウ側に協力 特殊作戦担うロシア人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592729?source=rss",
      "publishedAt": "2026-08-22T23:14:12.000Z",
      "xQuery": "ウ側に協力 特殊作戦担うロシア人"
    },
    {
      "time": "09:46",
      "title": "市の食料配布に4万人 動く自治体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592739?source=rss",
      "publishedAt": "2026-08-23T00:46:45.000Z",
      "xQuery": "市の食料配布に4万人 動く自治体"
    },
    {
      "time": "12:16",
      "title": "月10万円→30万円 都内老人ホーム",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592755?source=rss",
      "publishedAt": "2026-08-23T03:16:13.000Z",
      "xQuery": "月10万円→30万円 都内老人ホーム"
    },
    {
      "time": "12:02",
      "title": "関東で震度5弱 けが人30人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592754?source=rss",
      "publishedAt": "2026-08-23T03:02:19.000Z",
      "xQuery": "関東で震度5弱 けが人30人超"
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
