window.LUS_X_NEWS = {
  "updatedAt": "2026-07-30T01:39:08.127Z",
  "items": [
    {
      "time": "10:02",
      "title": "17人死亡6人心肺停止 熊本県発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589860?source=rss",
      "publishedAt": "2026-07-30T01:02:48.000Z",
      "xQuery": "17人死亡6人心肺停止 熊本県発表"
    },
    {
      "time": "07:53",
      "title": "熊本地震3日目の朝 続く救出活動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589850?source=rss",
      "publishedAt": "2026-07-29T22:53:20.000Z",
      "xQuery": "熊本地震3日目の朝 続く救出活動"
    },
    {
      "time": "07:55",
      "title": "熊本地震受け 各国首脳らコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589851?source=rss",
      "publishedAt": "2026-07-29T22:55:04.000Z",
      "xQuery": "熊本地震受け 各国首脳らコメント"
    },
    {
      "time": "09:12",
      "title": "地震で家つぶれ下敷きに 救助難航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589855?source=rss",
      "publishedAt": "2026-07-30T00:12:45.000Z",
      "xQuery": "地震で家つぶれ下敷きに 救助難航"
    },
    {
      "time": "10:28",
      "title": "米がイラン空爆を再開 応酬再燃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589864?source=rss",
      "publishedAt": "2026-07-30T01:28:30.000Z",
      "xQuery": "米がイラン空爆を再開 応酬再燃か"
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
