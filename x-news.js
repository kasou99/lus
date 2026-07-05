window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T14:37:00.768Z",
  "items": [
    {
      "time": "22:00",
      "title": "九州北部で非常に激しい雨か 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586856?source=rss",
      "publishedAt": "2026-07-05T13:00:20.000Z",
      "xQuery": "九州北部で非常に激しい雨か 警戒"
    },
    {
      "time": "22:24",
      "title": "はやぶさ2 小惑星の通過観測成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586862?source=rss",
      "publishedAt": "2026-07-05T13:24:55.000Z",
      "xQuery": "はやぶさ2 小惑星の通過観測成功"
    },
    {
      "time": "23:21",
      "title": "高市内閣の支持率65.9% JNN",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586866?source=rss",
      "publishedAt": "2026-07-05T14:21:13.000Z",
      "xQuery": "高市内閣の支持率65.9% JNN"
    },
    {
      "time": "19:05",
      "title": "終盤国会「空回し」の異常事態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586834?source=rss",
      "publishedAt": "2026-07-05T10:05:50.000Z",
      "xQuery": "終盤国会「空回し」の異常事態"
    },
    {
      "time": "21:08",
      "title": "4歳不明から30年 男の行方を捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586849?source=rss",
      "publishedAt": "2026-07-05T12:08:43.000Z",
      "xQuery": "4歳不明から30年 男の行方を捜査"
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
