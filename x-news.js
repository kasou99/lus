window.LUS_X_NEWS = {
  "updatedAt": "2026-10-04T03:44:23.238Z",
  "items": [
    {
      "time": "11:44",
      "title": "フーシ派 サウジの石油施設を攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597490?source=rss",
      "publishedAt": "2026-10-04T02:44:21.000Z",
      "xQuery": "フーシ派 サウジの石油施設を攻撃"
    },
    {
      "time": "10:24",
      "title": "横浜市長選が告示 7人が立候補",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597482?source=rss",
      "publishedAt": "2026-10-04T01:24:33.000Z",
      "xQuery": "横浜市長選が告示 7人が立候補"
    },
    {
      "time": "11:33",
      "title": "クマに襲われ1カ月で16人死亡 露",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597489?source=rss",
      "publishedAt": "2026-10-04T02:33:13.000Z",
      "xQuery": "クマに襲われ1カ月で16人死亡 露"
    },
    {
      "time": "10:24",
      "title": "死刑執行失敗 州矯正局長が辞任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597480?source=rss",
      "publishedAt": "2026-10-04T01:24:45.000Z",
      "xQuery": "死刑執行失敗 州矯正局長が辞任"
    },
    {
      "time": "12:07",
      "title": "9歳海に転落 救助図った男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597492?source=rss",
      "publishedAt": "2026-10-04T03:07:24.000Z",
      "xQuery": "9歳海に転落 救助図った男性死亡"
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
