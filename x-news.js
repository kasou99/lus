window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T02:35:41.324Z",
  "items": [
    {
      "time": "08:53",
      "title": "基礎控除上乗せ見直し 先送り方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604266?source=rss",
      "publishedAt": "2026-11-27T23:53:48.000Z",
      "xQuery": "基礎控除上乗せ見直し 先送り方針"
    },
    {
      "time": "10:11",
      "title": "独 核禁止条約再検討会議を欠席へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604275?source=rss",
      "publishedAt": "2026-11-28T01:11:26.000Z",
      "xQuery": "独 核禁止条約再検討会議を欠席へ"
    },
    {
      "time": "08:08",
      "title": "邦人を売春させた疑い 韓国で捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604254?source=rss",
      "publishedAt": "2026-11-27T23:08:30.000Z",
      "xQuery": "邦人を売春させた疑い 韓国で捜査"
    },
    {
      "time": "10:34",
      "title": "疲弊する管理職 重荷を下ろす制度",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604276?source=rss",
      "publishedAt": "2026-11-28T01:34:03.000Z",
      "xQuery": "疲弊する管理職 重荷を下ろす制度"
    },
    {
      "time": "10:01",
      "title": "お台場オワコン説は本当? 分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604270?source=rss",
      "publishedAt": "2026-11-28T01:01:05.000Z",
      "xQuery": "お台場オワコン説は本当? 分析"
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
