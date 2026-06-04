window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T01:39:16.549Z",
  "items": [
    {
      "time": "09:54",
      "title": "イスラエルとレバノン 停戦再合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582881?source=rss",
      "publishedAt": "2026-06-04T00:54:21.000Z",
      "xQuery": "イスラエルとレバノン 停戦再合意"
    },
    {
      "time": "08:23",
      "title": "7～8日は気圧低下 めまいなど注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582868?source=rss",
      "publishedAt": "2026-06-03T23:23:22.000Z",
      "xQuery": "7～8日は気圧低下 めまいなど注意"
    },
    {
      "time": "08:56",
      "title": "米スペースX 調達額は12兆円規模",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582873?source=rss",
      "publishedAt": "2026-06-03T23:56:55.000Z",
      "xQuery": "米スペースX 調達額は12兆円規模"
    },
    {
      "time": "08:03",
      "title": "ヤマダHDとEDION 経営統合の方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582867?source=rss",
      "publishedAt": "2026-06-03T23:03:23.000Z",
      "xQuery": "ヤマダHDとEDION 経営統合の方針"
    },
    {
      "time": "10:35",
      "title": "姫路城しっくい剥がれる 台風か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582884?source=rss",
      "publishedAt": "2026-06-04T01:35:39.000Z",
      "xQuery": "姫路城しっくい剥がれる 台風か"
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
