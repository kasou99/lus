window.LUS_X_NEWS = {
  "updatedAt": "2026-07-17T08:50:49.792Z",
  "items": [
    {
      "time": "16:41",
      "title": "八王子で非常に激しい雨 観測1位",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588287?source=rss",
      "publishedAt": "2026-07-17T07:41:31.000Z",
      "xQuery": "八王子で非常に激しい雨 観測1位"
    },
    {
      "time": "17:04",
      "title": "福岡県議会議長 金銭授受を否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588290?source=rss",
      "publishedAt": "2026-07-17T08:04:30.000Z",
      "xQuery": "福岡県議会議長 金銭授受を否定"
    },
    {
      "time": "17:05",
      "title": "5歳不明 発見の遺体は身長115cm",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588289?source=rss",
      "publishedAt": "2026-07-17T08:05:37.000Z",
      "xQuery": "5歳不明 発見の遺体は身長115cm"
    },
    {
      "time": "16:25",
      "title": "富士山で99歳女性遭難 救助される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588272?source=rss",
      "publishedAt": "2026-07-17T07:25:45.000Z",
      "xQuery": "富士山で99歳女性遭難 救助される"
    },
    {
      "time": "17:25",
      "title": "憲法缶バッジ盛況 開発元「感動」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588294?source=rss",
      "publishedAt": "2026-07-17T08:25:35.000Z",
      "xQuery": "憲法缶バッジ盛況 開発元「感動」"
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
