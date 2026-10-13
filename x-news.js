window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T03:55:22.041Z",
  "items": [
    {
      "time": "11:59",
      "title": "簗氏との面談記録作成せず 国交相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598602?source=rss",
      "publishedAt": "2026-10-13T02:59:51.000Z",
      "xQuery": "簗氏との面談記録作成せず 国交相"
    },
    {
      "time": "10:49",
      "title": "九州新幹線 運転再開は夕方以降に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598590?source=rss",
      "publishedAt": "2026-10-13T01:49:06.000Z",
      "xQuery": "九州新幹線 運転再開は夕方以降に"
    },
    {
      "time": "12:02",
      "title": "渋滞で玉突き 追突された女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598601?source=rss",
      "publishedAt": "2026-10-13T03:02:07.000Z",
      "xQuery": "渋滞で玉突き 追突された女性死亡"
    },
    {
      "time": "12:46",
      "title": "愛知小1死亡事件 母親が故意否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598613?source=rss",
      "publishedAt": "2026-10-13T03:46:58.000Z",
      "xQuery": "愛知小1死亡事件 母親が故意否認"
    },
    {
      "time": "11:19",
      "title": "家が買えない なぜ高騰している",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598588?source=rss",
      "publishedAt": "2026-10-13T02:19:22.000Z",
      "xQuery": "家が買えない なぜ高騰している"
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
