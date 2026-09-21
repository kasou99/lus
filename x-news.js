window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T04:23:15.803Z",
  "items": [
    {
      "time": "13:19",
      "title": "命守って 東京・大島町に特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596008?source=rss",
      "publishedAt": "2026-09-21T04:19:31.000Z",
      "xQuery": "命守って 東京・大島町に特別警報"
    },
    {
      "time": "13:07",
      "title": "東京・大島町に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596007?source=rss",
      "publishedAt": "2026-09-21T04:07:36.000Z",
      "xQuery": "東京・大島町に特別警報 最新情報"
    },
    {
      "time": "11:35",
      "title": "台風が関東接近 雨量増加に警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595997?source=rss",
      "publishedAt": "2026-09-21T02:35:48.000Z",
      "xQuery": "台風が関東接近 雨量増加に警戒を"
    },
    {
      "time": "12:28",
      "title": "事故で意識不明の男児が死亡 福岡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596004?source=rss",
      "publishedAt": "2026-09-21T03:28:34.000Z",
      "xQuery": "事故で意識不明の男児が死亡 福岡"
    },
    {
      "time": "11:37",
      "title": "東名で車がスリップか 運転手死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595998?source=rss",
      "publishedAt": "2026-09-21T02:37:30.000Z",
      "xQuery": "東名で車がスリップか 運転手死亡"
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
