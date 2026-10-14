window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T13:16:10.295Z",
  "items": [
    {
      "time": "21:26",
      "title": "農水相辞任 首相が任命責任に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598778?source=rss",
      "publishedAt": "2026-10-14T12:26:22.000Z",
      "xQuery": "農水相辞任 首相が任命責任に言及"
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
      "time": "19:49",
      "title": "農相「これ以上迷惑かけられず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598770?source=rss",
      "publishedAt": "2026-10-14T10:49:55.000Z",
      "xQuery": "農相「これ以上迷惑かけられず」"
    },
    {
      "time": "22:01",
      "title": "新宿109KENZO 池田容疑者を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598783?source=rss",
      "publishedAt": "2026-10-14T13:01:56.000Z",
      "xQuery": "新宿109KENZO 池田容疑者を逮捕"
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
