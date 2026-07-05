window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T16:27:54.646Z",
  "items": [
    {
      "time": "22:00",
      "title": "九州北部で非常に激しい雨か 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586856?source=rss",
      "publishedAt": "2026-07-05T13:00:20.000Z",
      "xQuery": "九州北部で非常に激しい雨か 警戒"
    },
    {
      "time": "23:21",
      "title": "高市内閣の支持率65.9% JNN",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586866?source=rss",
      "publishedAt": "2026-07-05T14:21:13.000Z",
      "xQuery": "高市内閣の支持率65.9% JNN"
    },
    {
      "time": "21:40",
      "title": "米建国250年 行事の私物化批判も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586853?source=rss",
      "publishedAt": "2026-07-05T12:40:03.000Z",
      "xQuery": "米建国250年 行事の私物化批判も"
    },
    {
      "time": "21:54",
      "title": "スイミング大会中に溺れ 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586857?source=rss",
      "publishedAt": "2026-07-05T12:54:54.000Z",
      "xQuery": "スイミング大会中に溺れ 男性死亡"
    },
    {
      "time": "00:49",
      "title": "ヒグマ事故 羅臼岳で登山道再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586871?source=rss",
      "publishedAt": "2026-07-05T15:49:49.000Z",
      "xQuery": "ヒグマ事故 羅臼岳で登山道再開"
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
