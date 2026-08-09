window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T00:28:51.172Z",
  "items": [
    {
      "time": "08:46",
      "title": "平和祈念像 彫刻家がこめた情熱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591055?source=rss",
      "publishedAt": "2026-08-08T23:46:58.000Z",
      "xQuery": "平和祈念像 彫刻家がこめた情熱"
    },
    {
      "time": "08:28",
      "title": "米中間選挙 岩盤層「MAGA」健在",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591048?source=rss",
      "publishedAt": "2026-08-08T23:28:01.000Z",
      "xQuery": "米中間選挙 岩盤層「MAGA」健在"
    },
    {
      "time": "08:48",
      "title": "長野で土砂崩落 400人近く孤立か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591053?source=rss",
      "publishedAt": "2026-08-08T23:48:20.000Z",
      "xQuery": "長野で土砂崩落 400人近く孤立か"
    },
    {
      "time": "07:51",
      "title": "男性はねられ死亡 ひき逃げで捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591045?source=rss",
      "publishedAt": "2026-08-08T22:51:41.000Z",
      "xQuery": "男性はねられ死亡 ひき逃げで捜査"
    },
    {
      "time": "07:54",
      "title": "ソニーがタムロンに買収提案 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591046?source=rss",
      "publishedAt": "2026-08-08T22:54:18.000Z",
      "xQuery": "ソニーがタムロンに買収提案 なぜ"
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
