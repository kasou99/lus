window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T15:37:08.867Z",
  "items": [
    {
      "time": "22:34",
      "title": "東海-東北の太平洋側で大雨 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594468?source=rss",
      "publishedAt": "2026-09-06T13:34:42.000Z",
      "xQuery": "東海-東北の太平洋側で大雨 警戒"
    },
    {
      "time": "23:22",
      "title": "全国の鉄道・フライト 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591369?source=rss",
      "publishedAt": "2026-09-06T14:22:46.000Z",
      "xQuery": "全国の鉄道・フライト 最新情報"
    },
    {
      "time": "22:57",
      "title": "内閣支持率が62.5%に上昇 JNN",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594473?source=rss",
      "publishedAt": "2026-09-06T13:57:26.000Z",
      "xQuery": "内閣支持率が62.5%に上昇 JNN"
    },
    {
      "time": "22:39",
      "title": "ケーキ店火災 男性の遺体に刺し傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594471?source=rss",
      "publishedAt": "2026-09-06T13:39:08.000Z",
      "xQuery": "ケーキ店火災 男性の遺体に刺し傷"
    },
    {
      "time": "16:18",
      "title": "複数作業員に列車接近 JR西で3月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594428?source=rss",
      "publishedAt": "2026-09-06T07:18:38.000Z",
      "xQuery": "複数作業員に列車接近 JR西で3月"
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
