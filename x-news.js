window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T02:43:13.276Z",
  "items": [
    {
      "time": "09:55",
      "title": "最低賃金 政治圧力緩み競争が一服",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594171?source=rss",
      "publishedAt": "2026-09-04T00:55:23.000Z",
      "xQuery": "最低賃金 政治圧力緩み競争が一服"
    },
    {
      "time": "09:14",
      "title": "米中間選挙 共和牙城で異例の接戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594166?source=rss",
      "publishedAt": "2026-09-04T00:14:21.000Z",
      "xQuery": "米中間選挙 共和牙城で異例の接戦"
    },
    {
      "time": "11:03",
      "title": "イオン爆発 避難後に客も再入館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594178?source=rss",
      "publishedAt": "2026-09-04T02:03:36.000Z",
      "xQuery": "イオン爆発 避難後に客も再入館"
    },
    {
      "time": "11:30",
      "title": "県議会の金銭授受疑惑6人目新証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594182?source=rss",
      "publishedAt": "2026-09-04T02:30:57.000Z",
      "xQuery": "県議会の金銭授受疑惑6人目新証言"
    },
    {
      "time": "10:42",
      "title": "「まんじゅうや」票無効 市民の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594177?source=rss",
      "publishedAt": "2026-09-04T01:42:24.000Z",
      "xQuery": "「まんじゅうや」票無効 市民の声"
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
