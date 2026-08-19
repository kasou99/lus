window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T07:19:25.967Z",
  "items": [
    {
      "time": "14:14",
      "title": "豪雨 放置車の所有者現れるか懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592280?source=rss",
      "publishedAt": "2026-08-19T05:14:55.000Z",
      "xQuery": "豪雨 放置車の所有者現れるか懸念"
    },
    {
      "time": "12:58",
      "title": "米大統領娘婿がハマスと協議 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592273?source=rss",
      "publishedAt": "2026-08-19T03:58:11.000Z",
      "xQuery": "米大統領娘婿がハマスと協議 背景"
    },
    {
      "time": "16:00",
      "title": "万博 盛況の影で工事の不祥事続々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592290?source=rss",
      "publishedAt": "2026-08-19T07:00:32.000Z",
      "xQuery": "万博 盛況の影で工事の不祥事続々"
    },
    {
      "time": "14:42",
      "title": "フードデリバリー「menu」終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592284?source=rss",
      "publishedAt": "2026-08-19T05:42:13.000Z",
      "xQuery": "フードデリバリー「menu」終了へ"
    },
    {
      "time": "14:57",
      "title": "転売目的で大量購入 悪性bot実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592285?source=rss",
      "publishedAt": "2026-08-19T05:57:14.000Z",
      "xQuery": "転売目的で大量購入 悪性bot実態"
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
