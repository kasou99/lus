window.LUS_X_NEWS = {
  "updatedAt": "2026-08-20T05:43:13.251Z",
  "items": [
    {
      "time": "14:03",
      "title": "ICC所長へ米制裁 組織の「弱点」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592389?source=rss",
      "publishedAt": "2026-08-20T05:03:21.000Z",
      "xQuery": "ICC所長へ米制裁 組織の「弱点」"
    },
    {
      "time": "11:48",
      "title": "ロシアでガソリン不足「第2波」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592382?source=rss",
      "publishedAt": "2026-08-20T02:48:06.000Z",
      "xQuery": "ロシアでガソリン不足「第2波」"
    },
    {
      "time": "13:40",
      "title": "特急電車に接触 作業員4人が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592397?source=rss",
      "publishedAt": "2026-08-20T04:40:56.000Z",
      "xQuery": "特急電車に接触 作業員4人が死亡"
    },
    {
      "time": "13:59",
      "title": "女児34人にわいせつ 判決の背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592400?source=rss",
      "publishedAt": "2026-08-20T04:59:06.000Z",
      "xQuery": "女児34人にわいせつ 判決の背景"
    },
    {
      "time": "13:32",
      "title": "外食で「ダブル看板」広がる 戦略",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592387?source=rss",
      "publishedAt": "2026-08-20T04:32:07.000Z",
      "xQuery": "外食で「ダブル看板」広がる 戦略"
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
