window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T13:55:08.849Z",
  "items": [
    {
      "time": "22:40",
      "title": "独の福祉施設で銃撃事件 5人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586156?source=rss",
      "publishedAt": "2026-06-29T13:40:22.000Z",
      "xQuery": "独の福祉施設で銃撃事件 5人死亡"
    },
    {
      "time": "21:26",
      "title": "米W杯放映会場近くで銃撃1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586149?source=rss",
      "publishedAt": "2026-06-29T12:26:30.000Z",
      "xQuery": "米W杯放映会場近くで銃撃1人死亡"
    },
    {
      "time": "20:34",
      "title": "小学校の「算数」名称を維持へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586143?source=rss",
      "publishedAt": "2026-06-29T11:34:57.000Z",
      "xQuery": "小学校の「算数」名称を維持へ"
    },
    {
      "time": "22:12",
      "title": "なぜうちが 中国禁輸拡大に戸惑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586152?source=rss",
      "publishedAt": "2026-06-29T13:12:10.000Z",
      "xQuery": "なぜうちが 中国禁輸拡大に戸惑い"
    },
    {
      "time": "21:49",
      "title": "給食の弁当にゴキブリか 生徒発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586151?source=rss",
      "publishedAt": "2026-06-29T12:49:42.000Z",
      "xQuery": "給食の弁当にゴキブリか 生徒発見"
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
