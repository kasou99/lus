window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T11:09:32.059Z",
  "items": [
    {
      "time": "17:40",
      "title": "比の国防相 日本の武器輸出期待",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582437?source=rss",
      "publishedAt": "2026-05-31T08:40:08.000Z",
      "xQuery": "比の国防相 日本の武器輸出期待"
    },
    {
      "time": "19:13",
      "title": "米の日本製紙子会社事故 死者11人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582448?source=rss",
      "publishedAt": "2026-05-31T10:13:42.000Z",
      "xQuery": "米の日本製紙子会社事故 死者11人"
    },
    {
      "time": "18:58",
      "title": "東北道で貨物車が大破 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582446?source=rss",
      "publishedAt": "2026-05-31T09:58:57.000Z",
      "xQuery": "東北道で貨物車が大破 男性死亡"
    },
    {
      "time": "18:26",
      "title": "ビッグイベント多発 都内は大混雑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582445?source=rss",
      "publishedAt": "2026-05-31T09:26:41.000Z",
      "xQuery": "ビッグイベント多発 都内は大混雑"
    },
    {
      "time": "19:57",
      "title": "嵐ありがとう 企業から投稿相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582452?source=rss",
      "publishedAt": "2026-05-31T10:57:59.000Z",
      "xQuery": "嵐ありがとう 企業から投稿相次ぐ"
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
