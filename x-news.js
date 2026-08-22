window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T00:20:33.945Z",
  "items": [
    {
      "time": "07:24",
      "title": "千葉豪雨 車両約2500台の撤去完了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592599?source=rss",
      "publishedAt": "2026-08-21T22:24:01.000Z",
      "xQuery": "千葉豪雨 車両約2500台の撤去完了"
    },
    {
      "time": "08:23",
      "title": "九州中心に危険な暑さ 熱中症注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592608?source=rss",
      "publishedAt": "2026-08-21T23:23:00.000Z",
      "xQuery": "九州中心に危険な暑さ 熱中症注意"
    },
    {
      "time": "07:23",
      "title": "赤根所長 ICC加盟国に支援求める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592600?source=rss",
      "publishedAt": "2026-08-21T22:23:53.000Z",
      "xQuery": "赤根所長 ICC加盟国に支援求める"
    },
    {
      "time": "07:46",
      "title": "4人死亡「見張員はベテラン」証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592602?source=rss",
      "publishedAt": "2026-08-21T22:46:36.000Z",
      "xQuery": "4人死亡「見張員はベテラン」証言"
    },
    {
      "time": "07:54",
      "title": "若年層で「うつ病」影響が顕在化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592603?source=rss",
      "publishedAt": "2026-08-21T22:54:42.000Z",
      "xQuery": "若年層で「うつ病」影響が顕在化"
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
