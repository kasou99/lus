window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T05:13:52.611Z",
  "items": [
    {
      "time": "13:29",
      "title": "台風18号 26日ごろ沖縄接近の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592527?source=rss",
      "publishedAt": "2026-08-21T04:29:44.000Z",
      "xQuery": "台風18号 26日ごろ沖縄接近の恐れ"
    },
    {
      "time": "13:42",
      "title": "内閣改造 総裁選争った4人処遇は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592528?source=rss",
      "publishedAt": "2026-08-21T04:42:29.000Z",
      "xQuery": "内閣改造 総裁選争った4人処遇は"
    },
    {
      "time": "13:02",
      "title": "議長巡る福岡県会の採決中止 苦情",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592524?source=rss",
      "publishedAt": "2026-08-21T04:02:29.000Z",
      "xQuery": "議長巡る福岡県会の採決中止 苦情"
    },
    {
      "time": "13:20",
      "title": "登校中児童11人 ハチに刺され搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592526?source=rss",
      "publishedAt": "2026-08-21T04:20:51.000Z",
      "xQuery": "登校中児童11人 ハチに刺され搬送"
    },
    {
      "time": "12:12",
      "title": "水原受刑者事件 記者の尽きぬ疑問",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592512?source=rss",
      "publishedAt": "2026-08-21T03:12:00.000Z",
      "xQuery": "水原受刑者事件 記者の尽きぬ疑問"
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
