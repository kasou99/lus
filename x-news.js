window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T13:48:39.084Z",
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
      "time": "16:15",
      "title": "鳥人間 作業員が琵琶湖落下し死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586940?source=rss",
      "publishedAt": "2026-07-06T07:15:58.000Z",
      "xQuery": "鳥人間 作業員が琵琶湖落下し死亡"
    },
    {
      "time": "22:04",
      "title": "「漁船乗るか」誘拐疑いで4人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586982?source=rss",
      "publishedAt": "2026-07-06T13:04:15.000Z",
      "xQuery": "「漁船乗るか」誘拐疑いで4人逮捕"
    },
    {
      "time": "21:25",
      "title": "関空送迎レーン有料化へ 5分300円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586977?source=rss",
      "publishedAt": "2026-07-06T12:25:49.000Z",
      "xQuery": "関空送迎レーン有料化へ 5分300円"
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
