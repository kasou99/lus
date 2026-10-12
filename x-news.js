window.LUS_X_NEWS = {
  "updatedAt": "2026-10-12T09:35:44.028Z",
  "items": [
    {
      "time": "16:49",
      "title": "英首相 EU離脱投票「露が干渉」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598522?source=rss",
      "publishedAt": "2026-10-12T07:49:37.000Z",
      "xQuery": "英首相 EU離脱投票「露が干渉」"
    },
    {
      "time": "16:18",
      "title": "休校いつまで クマ対応に学校苦慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598517?source=rss",
      "publishedAt": "2026-10-12T07:18:06.000Z",
      "xQuery": "休校いつまで クマ対応に学校苦慮"
    },
    {
      "time": "17:10",
      "title": "工場火災 10h超も鎮火めど立たず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598523?source=rss",
      "publishedAt": "2026-10-12T08:10:11.000Z",
      "xQuery": "工場火災 10h超も鎮火めど立たず"
    },
    {
      "time": "17:36",
      "title": "ハチの巣駆除が原因か 2棟燃える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598525?source=rss",
      "publishedAt": "2026-10-12T08:36:41.000Z",
      "xQuery": "ハチの巣駆除が原因か 2棟燃える"
    },
    {
      "time": "17:15",
      "title": "江東花火大会 保険巡り開催ピンチ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598524?source=rss",
      "publishedAt": "2026-10-12T08:15:06.000Z",
      "xQuery": "江東花火大会 保険巡り開催ピンチ"
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
