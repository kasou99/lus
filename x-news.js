window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T23:22:52.593Z",
  "items": [
    {
      "time": "08:14",
      "title": "地震住宅被害3649棟 前日の2倍超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590213?source=rss",
      "publishedAt": "2026-08-01T23:14:07.000Z",
      "xQuery": "地震住宅被害3649棟 前日の2倍超"
    },
    {
      "time": "07:28",
      "title": "日米が協調為替介入 15年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590202?source=rss",
      "publishedAt": "2026-08-01T22:28:48.000Z",
      "xQuery": "日米が協調為替介入 15年ぶり"
    },
    {
      "time": "08:05",
      "title": "帰省中に行方不明の2歳 山で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590212?source=rss",
      "publishedAt": "2026-08-01T23:05:19.000Z",
      "xQuery": "帰省中に行方不明の2歳 山で発見"
    },
    {
      "time": "07:33",
      "title": "シジミ採り中に溺れたか 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590205?source=rss",
      "publishedAt": "2026-08-01T22:33:15.000Z",
      "xQuery": "シジミ採り中に溺れたか 男性死亡"
    },
    {
      "time": "22:22",
      "title": "著名登山家死亡 パキスタンで雪崩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590194?source=rss",
      "publishedAt": "2026-08-01T13:22:35.000Z",
      "xQuery": "著名登山家死亡 パキスタンで雪崩"
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
