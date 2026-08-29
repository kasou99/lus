window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T10:36:33.984Z",
  "items": [
    {
      "time": "19:25",
      "title": "千葉豪雨 半壊判定が大幅増見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593545?source=rss",
      "publishedAt": "2026-08-29T10:25:07.000Z",
      "xQuery": "千葉豪雨 半壊判定が大幅増見通し"
    },
    {
      "time": "18:49",
      "title": "津波想定34m 変化する町民の行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593542?source=rss",
      "publishedAt": "2026-08-29T09:49:20.000Z",
      "xQuery": "津波想定34m 変化する町民の行動"
    },
    {
      "time": "18:34",
      "title": "海で流され不明の中高生3人 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593541?source=rss",
      "publishedAt": "2026-08-29T09:34:51.000Z",
      "xQuery": "海で流され不明の中高生3人 死亡"
    },
    {
      "time": "19:16",
      "title": "時計窃盗 被害品とは別の2本発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593544?source=rss",
      "publishedAt": "2026-08-29T10:16:31.000Z",
      "xQuery": "時計窃盗 被害品とは別の2本発見"
    },
    {
      "time": "18:56",
      "title": "観光客らバイク通行 吊り橋が危機",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593543?source=rss",
      "publishedAt": "2026-08-29T09:56:23.000Z",
      "xQuery": "観光客らバイク通行 吊り橋が危機"
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
