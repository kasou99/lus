window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T07:21:50.932Z",
  "items": [
    {
      "time": "13:19",
      "title": "福岡県議長 辞職の理由説明せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593001?source=rss",
      "publishedAt": "2026-08-25T04:19:30.000Z",
      "xQuery": "福岡県議長 辞職の理由説明せず"
    },
    {
      "time": "15:03",
      "title": "ウで徴兵をめぐる暴力が増 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593012?source=rss",
      "publishedAt": "2026-08-25T06:03:18.000Z",
      "xQuery": "ウで徴兵をめぐる暴力が増 背景は"
    },
    {
      "time": "15:28",
      "title": "日航機墜落 修理ミス巡り国公表へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593013?source=rss",
      "publishedAt": "2026-08-25T06:28:31.000Z",
      "xQuery": "日航機墜落 修理ミス巡り国公表へ"
    },
    {
      "time": "13:59",
      "title": "高2死亡 車に追われ暴行されたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593007?source=rss",
      "publishedAt": "2026-08-25T04:59:23.000Z",
      "xQuery": "高2死亡 車に追われ暴行されたか"
    },
    {
      "time": "13:44",
      "title": "違法駐車でバス23分足止め 責任は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593003?source=rss",
      "publishedAt": "2026-08-25T04:44:13.000Z",
      "xQuery": "違法駐車でバス23分足止め 責任は"
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
