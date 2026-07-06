window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T22:32:16.071Z",
  "items": [
    {
      "time": "22:17",
      "title": "高市首相 NATO首脳会議を欠席へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586983?source=rss",
      "publishedAt": "2026-07-06T13:17:24.000Z",
      "xQuery": "高市首相 NATO首脳会議を欠席へ"
    },
    {
      "time": "21:43",
      "title": "5歳不明2週間 父「諦めていない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586980?source=rss",
      "publishedAt": "2026-07-06T12:43:45.000Z",
      "xQuery": "5歳不明2週間 父「諦めていない」"
    },
    {
      "time": "07:20",
      "title": "障害の少女監禁疑い 新たに兄逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586995?source=rss",
      "publishedAt": "2026-07-06T22:20:02.000Z",
      "xQuery": "障害の少女監禁疑い 新たに兄逮捕"
    },
    {
      "time": "23:24",
      "title": "逮捕状出された少年 川泳いで逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586990?source=rss",
      "publishedAt": "2026-07-06T14:24:49.000Z",
      "xQuery": "逮捕状出された少年 川泳いで逃走"
    },
    {
      "time": "07:23",
      "title": "旧人と現生人類に共通文化か 研究",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586997?source=rss",
      "publishedAt": "2026-07-06T22:23:15.000Z",
      "xQuery": "旧人と現生人類に共通文化か 研究"
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
