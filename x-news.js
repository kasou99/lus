window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T22:01:13.161Z",
  "items": [
    {
      "time": "22:29",
      "title": "典範改正閣議決定 宮内庁に戸惑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586277?source=rss",
      "publishedAt": "2026-06-30T13:29:54.000Z",
      "xQuery": "典範改正閣議決定 宮内庁に戸惑い"
    },
    {
      "time": "22:39",
      "title": "歴史的な円安水準 生活への影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586279?source=rss",
      "publishedAt": "2026-06-30T13:39:46.000Z",
      "xQuery": "歴史的な円安水準 生活への影響は"
    },
    {
      "time": "22:51",
      "title": "広島強殺 男はギャンブルで困窮か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586281?source=rss",
      "publishedAt": "2026-06-30T13:51:04.000Z",
      "xQuery": "広島強殺 男はギャンブルで困窮か"
    },
    {
      "time": "06:37",
      "title": "富士山遭難死の7割が3000m超 分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586286?source=rss",
      "publishedAt": "2026-06-30T21:37:22.000Z",
      "xQuery": "富士山遭難死の7割が3000m超 分析"
    },
    {
      "time": "17:02",
      "title": "「もっちゅりん」第2弾の発売中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586240?source=rss",
      "publishedAt": "2026-06-30T08:02:21.000Z",
      "xQuery": "「もっちゅりん」第2弾の発売中止"
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
