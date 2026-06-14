window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T02:25:24.833Z",
  "items": [
    {
      "time": "09:20",
      "title": "原子力規制庁の異動ルール 緩和へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584160?source=rss",
      "publishedAt": "2026-06-14T00:20:01.000Z",
      "xQuery": "原子力規制庁の異動ルール 緩和へ"
    },
    {
      "time": "10:35",
      "title": "警視庁 警察学校見学ツアー始める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584170?source=rss",
      "publishedAt": "2026-06-14T01:35:59.000Z",
      "xQuery": "警視庁 警察学校見学ツアー始める"
    },
    {
      "time": "11:13",
      "title": "学校放送室に基準値超のダニ 福岡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584179?source=rss",
      "publishedAt": "2026-06-14T02:13:11.000Z",
      "xQuery": "学校放送室に基準値超のダニ 福岡"
    },
    {
      "time": "08:54",
      "title": "韓国スタバ不買運動 返金に客殺到",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584158?source=rss",
      "publishedAt": "2026-06-13T23:54:30.000Z",
      "xQuery": "韓国スタバ不買運動 返金に客殺到"
    },
    {
      "time": "10:08",
      "title": "スムージー半額で完売 戦略の効果",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584166?source=rss",
      "publishedAt": "2026-06-14T01:08:12.000Z",
      "xQuery": "スムージー半額で完売 戦略の効果"
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
