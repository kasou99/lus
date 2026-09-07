window.LUS_X_NEWS = {
  "updatedAt": "2026-09-07T06:39:53.614Z",
  "items": [
    {
      "time": "15:25",
      "title": "命守る行動を 利島村に特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594542?source=rss",
      "publishedAt": "2026-09-07T06:25:37.000Z",
      "xQuery": "命守る行動を 利島村に特別警報"
    },
    {
      "time": "15:29",
      "title": "利島村などに特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594541?source=rss",
      "publishedAt": "2026-09-07T06:29:42.000Z",
      "xQuery": "利島村などに特別警報 最新情報"
    },
    {
      "time": "14:42",
      "title": "ロシア軍機 北方領土を領空侵犯",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594539?source=rss",
      "publishedAt": "2026-09-07T05:42:12.000Z",
      "xQuery": "ロシア軍機 北方領土を領空侵犯"
    },
    {
      "time": "14:48",
      "title": "米海軍フリゲート候補 韓国優位か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594518?source=rss",
      "publishedAt": "2026-09-07T05:48:17.000Z",
      "xQuery": "米海軍フリゲート候補 韓国優位か"
    },
    {
      "time": "12:49",
      "title": "相手が独身偽装 悲しみ上回る衝撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594523?source=rss",
      "publishedAt": "2026-09-07T03:49:00.000Z",
      "xQuery": "相手が独身偽装 悲しみ上回る衝撃"
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
