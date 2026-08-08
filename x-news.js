window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T05:19:53.412Z",
  "items": [
    {
      "time": "13:03",
      "title": "高市首相 人事で旧安倍派重用か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590962?source=rss",
      "publishedAt": "2026-08-08T04:03:47.000Z",
      "xQuery": "高市首相 人事で旧安倍派重用か"
    },
    {
      "time": "11:48",
      "title": "無理に学校行かせ被爆死 母は自責",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590957?source=rss",
      "publishedAt": "2026-08-08T02:48:25.000Z",
      "xQuery": "無理に学校行かせ被爆死 母は自責"
    },
    {
      "time": "10:59",
      "title": "高速道で何度も追突され 一部始終",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590948?source=rss",
      "publishedAt": "2026-08-08T01:59:41.000Z",
      "xQuery": "高速道で何度も追突され 一部始終"
    },
    {
      "time": "12:18",
      "title": "令和8年8月8日 婚姻届窓口に行列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590958?source=rss",
      "publishedAt": "2026-08-08T03:18:53.000Z",
      "xQuery": "令和8年8月8日 婚姻届窓口に行列"
    },
    {
      "time": "09:40",
      "title": "名前ドラえもん16人 インドネシア",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590941?source=rss",
      "publishedAt": "2026-08-08T00:40:29.000Z",
      "xQuery": "名前ドラえもん16人 インドネシア"
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
