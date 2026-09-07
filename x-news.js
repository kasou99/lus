window.LUS_X_NEWS = {
  "updatedAt": "2026-09-07T04:43:41.864Z",
  "items": [
    {
      "time": "13:00",
      "title": "命守る行動を 大島町に特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594529?source=rss",
      "publishedAt": "2026-09-07T04:00:37.000Z",
      "xQuery": "命守る行動を 大島町に特別警報"
    },
    {
      "time": "12:44",
      "title": "大島町と新島村 特別警報最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594526?source=rss",
      "publishedAt": "2026-09-07T03:44:50.000Z",
      "xQuery": "大島町と新島村 特別警報最新情報"
    },
    {
      "time": "12:44",
      "title": "アンダーパスで車水没 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594525?source=rss",
      "publishedAt": "2026-09-07T03:44:20.000Z",
      "xQuery": "アンダーパスで車水没 1人死亡"
    },
    {
      "time": "12:15",
      "title": "ケーキ店火災 死亡男性招かれずか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594515?source=rss",
      "publishedAt": "2026-09-07T03:15:14.000Z",
      "xQuery": "ケーキ店火災 死亡男性招かれずか"
    },
    {
      "time": "11:18",
      "title": "首撃たれ障害残る夫 時効に妻訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594510?source=rss",
      "publishedAt": "2026-09-07T02:18:47.000Z",
      "xQuery": "首撃たれ障害残る夫 時効に妻訴え"
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
