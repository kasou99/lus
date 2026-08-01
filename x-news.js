window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T10:10:29.959Z",
  "items": [
    {
      "time": "17:31",
      "title": "ロシアがウ首都を空爆 9人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590168?source=rss",
      "publishedAt": "2026-08-01T08:31:12.000Z",
      "xQuery": "ロシアがウ首都を空爆 9人死亡"
    },
    {
      "time": "16:45",
      "title": "イオンモール熊本の捜索活動終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590166?source=rss",
      "publishedAt": "2026-08-01T07:45:20.000Z",
      "xQuery": "イオンモール熊本の捜索活動終了"
    },
    {
      "time": "16:31",
      "title": "東海や西日本2日以降も危険な暑さ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590162?source=rss",
      "publishedAt": "2026-08-01T07:31:18.000Z",
      "xQuery": "東海や西日本2日以降も危険な暑さ"
    },
    {
      "time": "18:54",
      "title": "ベトナム人5人がれきから女性救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590175?source=rss",
      "publishedAt": "2026-08-01T09:54:51.000Z",
      "xQuery": "ベトナム人5人がれきから女性救出"
    },
    {
      "time": "16:46",
      "title": "BYDオート社長 EV補助金に見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590164?source=rss",
      "publishedAt": "2026-08-01T07:46:05.000Z",
      "xQuery": "BYDオート社長 EV補助金に見解"
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
