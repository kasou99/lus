window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T10:07:56.469Z",
  "items": [
    {
      "time": "18:34",
      "title": "米 対カナダ50%追加関税を発動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592685?source=rss",
      "publishedAt": "2026-08-22T09:34:24.000Z",
      "xQuery": "米 対カナダ50%追加関税を発動"
    },
    {
      "time": "18:20",
      "title": "東京・埼玉で猛烈な雨 災害に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592682?source=rss",
      "publishedAt": "2026-08-22T09:20:42.000Z",
      "xQuery": "東京・埼玉で猛烈な雨 災害に注意"
    },
    {
      "time": "18:00",
      "title": "東京都の大雨 現地からのSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592680?source=rss",
      "publishedAt": "2026-08-22T09:00:36.000Z",
      "xQuery": "東京都の大雨 現地からのSNS投稿"
    },
    {
      "time": "17:08",
      "title": "国連委員 皇室典範などを批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592674?source=rss",
      "publishedAt": "2026-08-22T08:08:04.000Z",
      "xQuery": "国連委員 皇室典範などを批判"
    },
    {
      "time": "17:07",
      "title": "「超・老老介護」神経すり減る夫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592673?source=rss",
      "publishedAt": "2026-08-22T08:07:26.000Z",
      "xQuery": "「超・老老介護」神経すり減る夫"
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
