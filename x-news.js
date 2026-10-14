window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T12:27:14.847Z",
  "items": [
    {
      "time": "19:49",
      "title": "農相「これ以上迷惑かけられず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598770?source=rss",
      "publishedAt": "2026-10-14T10:49:55.000Z",
      "xQuery": "農相「これ以上迷惑かけられず」"
    },
    {
      "time": "20:20",
      "title": "名前を変える大学が増加 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598774?source=rss",
      "publishedAt": "2026-10-14T11:20:40.000Z",
      "xQuery": "名前を変える大学が増加 背景は"
    },
    {
      "time": "19:14",
      "title": "プール授業中に溺死 元担任も有罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598763?source=rss",
      "publishedAt": "2026-10-14T10:14:38.000Z",
      "xQuery": "プール授業中に溺死 元担任も有罪"
    },
    {
      "time": "19:33",
      "title": "警察官がひき逃げ疑い 書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598767?source=rss",
      "publishedAt": "2026-10-14T10:33:49.000Z",
      "xQuery": "警察官がひき逃げ疑い 書類送検"
    },
    {
      "time": "20:22",
      "title": "がんでカツラ 1人で遺影撮った妻",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598775?source=rss",
      "publishedAt": "2026-10-14T11:22:42.000Z",
      "xQuery": "がんでカツラ 1人で遺影撮った妻"
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
