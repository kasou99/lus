window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T02:43:42.970Z",
  "items": [
    {
      "time": "10:02",
      "title": "米財務長官 日本の円安是正を支持",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593944?source=rss",
      "publishedAt": "2026-09-02T01:02:05.000Z",
      "xQuery": "米財務長官 日本の円安是正を支持"
    },
    {
      "time": "10:41",
      "title": "ネパール土石流 間一髪だった邦人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593948?source=rss",
      "publishedAt": "2026-09-02T01:41:02.000Z",
      "xQuery": "ネパール土石流 間一髪だった邦人"
    },
    {
      "time": "11:36",
      "title": "露大統領 関係悪化は日本に全責任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593953?source=rss",
      "publishedAt": "2026-09-02T02:36:54.000Z",
      "xQuery": "露大統領 関係悪化は日本に全責任"
    },
    {
      "time": "10:52",
      "title": "アクアラインで衝突事故 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593949?source=rss",
      "publishedAt": "2026-09-02T01:52:01.000Z",
      "xQuery": "アクアラインで衝突事故 1人死亡"
    },
    {
      "time": "11:18",
      "title": "同姓が条件 婚活パーティーの狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593950?source=rss",
      "publishedAt": "2026-09-02T02:18:54.000Z",
      "xQuery": "同姓が条件 婚活パーティーの狙い"
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
