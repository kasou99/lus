window.LUS_X_NEWS = {
  "updatedAt": "2026-09-07T13:39:16.027Z",
  "items": [
    {
      "time": "20:35",
      "title": "10日頃まで前線停滞か 厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594575?source=rss",
      "publishedAt": "2026-09-07T11:35:49.000Z",
      "xQuery": "10日頃まで前線停滞か 厳重警戒"
    },
    {
      "time": "19:27",
      "title": "伊豆諸島に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594570?source=rss",
      "publishedAt": "2026-09-07T10:27:41.000Z",
      "xQuery": "伊豆諸島に特別警報 最新情報"
    },
    {
      "time": "19:49",
      "title": "続く苦難 また浸水のラーメン店",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594571?source=rss",
      "publishedAt": "2026-09-07T10:49:43.000Z",
      "xQuery": "続く苦難 また浸水のラーメン店"
    },
    {
      "time": "22:25",
      "title": "不採用者を匿流に紹介疑い 再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594585?source=rss",
      "publishedAt": "2026-09-07T13:25:19.000Z",
      "xQuery": "不採用者を匿流に紹介疑い 再逮捕"
    },
    {
      "time": "20:41",
      "title": "北朝鮮 なぜ日本海側に新型駆逐艦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594555?source=rss",
      "publishedAt": "2026-09-07T11:41:12.000Z",
      "xQuery": "北朝鮮 なぜ日本海側に新型駆逐艦"
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
