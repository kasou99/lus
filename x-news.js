window.LUS_X_NEWS = {
  "updatedAt": "2026-05-21T03:51:42.589Z",
  "items": [
    {
      "time": "12:44",
      "title": "夏の電気ガス補助 5000億円で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581074?source=rss",
      "publishedAt": "2026-05-21T03:44:48.000Z",
      "xQuery": "夏の電気ガス補助 5000億円で調整"
    },
    {
      "time": "08:40",
      "title": "エボラ ワクチン開発に数カ月か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581050?source=rss",
      "publishedAt": "2026-05-20T23:40:30.000Z",
      "xQuery": "エボラ ワクチン開発に数カ月か"
    },
    {
      "time": "12:12",
      "title": "スカウトGトップ 起訴内容認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581072?source=rss",
      "publishedAt": "2026-05-21T03:12:40.000Z",
      "xQuery": "スカウトGトップ 起訴内容認める"
    },
    {
      "time": "11:42",
      "title": "森永製菓 キャラメル2商品を休売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581067?source=rss",
      "publishedAt": "2026-05-21T02:42:20.000Z",
      "xQuery": "森永製菓 キャラメル2商品を休売"
    },
    {
      "time": "11:52",
      "title": "ウルトラマン 中国での収入大幅減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581068?source=rss",
      "publishedAt": "2026-05-21T02:52:51.000Z",
      "xQuery": "ウルトラマン 中国での収入大幅減"
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
