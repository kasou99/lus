window.LUS_X_NEWS = {
  "updatedAt": "2026-08-30T12:23:43.336Z",
  "items": [
    {
      "time": "19:18",
      "title": "福井大雨 土砂災害に厳重警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593658?source=rss",
      "publishedAt": "2026-08-30T10:18:16.000Z",
      "xQuery": "福井大雨 土砂災害に厳重警戒を"
    },
    {
      "time": "20:27",
      "title": "がれき下から声 ネパール少女救出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593667?source=rss",
      "publishedAt": "2026-08-30T11:27:06.000Z",
      "xQuery": "がれき下から声 ネパール少女救出"
    },
    {
      "time": "21:00",
      "title": "高校無償化で私立人気 公立は苦境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593670?source=rss",
      "publishedAt": "2026-08-30T12:00:05.000Z",
      "xQuery": "高校無償化で私立人気 公立は苦境"
    },
    {
      "time": "17:49",
      "title": "各地に存在「廃墟モール」の盛衰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593646?source=rss",
      "publishedAt": "2026-08-30T08:49:55.000Z",
      "xQuery": "各地に存在「廃墟モール」の盛衰"
    },
    {
      "time": "19:39",
      "title": "レゴランド閉じ込め 扉破壊し救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593662?source=rss",
      "publishedAt": "2026-08-30T10:39:14.000Z",
      "xQuery": "レゴランド閉じ込め 扉破壊し救助"
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
