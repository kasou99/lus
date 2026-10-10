window.LUS_X_NEWS = {
  "updatedAt": "2026-10-10T05:43:03.062Z",
  "items": [
    {
      "time": "11:08",
      "title": "新給付制度 対象など白紙で審議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598232?source=rss",
      "publishedAt": "2026-10-10T02:08:26.000Z",
      "xQuery": "新給付制度 対象など白紙で審議へ"
    },
    {
      "time": "14:27",
      "title": "衆院予算委 農水相への追及必至",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598252?source=rss",
      "publishedAt": "2026-10-10T05:27:12.000Z",
      "xQuery": "衆院予算委 農水相への追及必至"
    },
    {
      "time": "13:03",
      "title": "トランプ氏 平和賞を逃し批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598243?source=rss",
      "publishedAt": "2026-10-10T04:03:00.000Z",
      "xQuery": "トランプ氏 平和賞を逃し批判"
    },
    {
      "time": "13:03",
      "title": "批判乗り越え 男性カップルの幸せ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598242?source=rss",
      "publishedAt": "2026-10-10T04:03:52.000Z",
      "xQuery": "批判乗り越え 男性カップルの幸せ"
    },
    {
      "time": "14:07",
      "title": "太陽系外の惑星から電波 初検出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598251?source=rss",
      "publishedAt": "2026-10-10T05:07:25.000Z",
      "xQuery": "太陽系外の惑星から電波 初検出"
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
