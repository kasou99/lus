window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T15:14:12.827Z",
  "items": [
    {
      "time": "21:44",
      "title": "熊本地震 被災者それぞれの1カ月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593558?source=rss",
      "publishedAt": "2026-08-29T12:44:42.000Z",
      "xQuery": "熊本地震 被災者それぞれの1カ月"
    },
    {
      "time": "23:14",
      "title": "娘が不登校になった精神科医 訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593568?source=rss",
      "publishedAt": "2026-08-29T14:14:16.000Z",
      "xQuery": "娘が不登校になった精神科医 訴え"
    },
    {
      "time": "21:41",
      "title": "独右派AfD ナチス想起させる公約",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593557?source=rss",
      "publishedAt": "2026-08-29T12:41:52.000Z",
      "xQuery": "独右派AfD ナチス想起させる公約"
    },
    {
      "time": "21:11",
      "title": "海で3人死亡 14歳は救助図ったか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593554?source=rss",
      "publishedAt": "2026-08-29T12:11:53.000Z",
      "xQuery": "海で3人死亡 14歳は救助図ったか"
    },
    {
      "time": "21:19",
      "title": "牛が線路に迷い込む 列車80分停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593556?source=rss",
      "publishedAt": "2026-08-29T12:19:55.000Z",
      "xQuery": "牛が線路に迷い込む 列車80分停止"
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
