window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T23:34:31.434Z",
  "items": [
    {
      "time": "08:08",
      "title": "米イランが和平合意 戦闘終結へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584278?source=rss",
      "publishedAt": "2026-06-14T23:08:04.000Z",
      "xQuery": "米イランが和平合意 戦闘終結へ"
    },
    {
      "time": "08:10",
      "title": "首相が伊に到着 欧州歴訪2カ国目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584279?source=rss",
      "publishedAt": "2026-06-14T23:10:48.000Z",
      "xQuery": "首相が伊に到着 欧州歴訪2カ国目"
    },
    {
      "time": "08:08",
      "title": "ホルムズ海峡全面開放へ 米大統領",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584280?source=rss",
      "publishedAt": "2026-06-14T23:08:52.000Z",
      "xQuery": "ホルムズ海峡全面開放へ 米大統領"
    },
    {
      "time": "07:24",
      "title": "乗用車同士衝突 中高生ら8人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584272?source=rss",
      "publishedAt": "2026-06-14T22:24:48.000Z",
      "xQuery": "乗用車同士衝突 中高生ら8人けが"
    },
    {
      "time": "18:04",
      "title": "増える「ホビ垢」女子 実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584224?source=rss",
      "publishedAt": "2026-06-14T09:04:25.000Z",
      "xQuery": "増える「ホビ垢」女子 実態は"
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
