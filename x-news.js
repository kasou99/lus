window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T10:15:53.935Z",
  "items": [
    {
      "time": "17:15",
      "title": "内閣支持は微増 改造の効果限定的",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596626?source=rss",
      "publishedAt": "2026-09-26T08:15:59.000Z",
      "xQuery": "内閣支持は微増 改造の効果限定的"
    },
    {
      "time": "16:25",
      "title": "コメ下落「大盛り」値下げの動き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596619?source=rss",
      "publishedAt": "2026-09-26T07:25:45.000Z",
      "xQuery": "コメ下落「大盛り」値下げの動き"
    },
    {
      "time": "16:20",
      "title": "AIを「SI」と呼称 米中が合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596617?source=rss",
      "publishedAt": "2026-09-26T07:20:28.000Z",
      "xQuery": "AIを「SI」と呼称 米中が合意"
    },
    {
      "time": "18:54",
      "title": "10月値上げラッシュ 家計負担重く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596639?source=rss",
      "publishedAt": "2026-09-26T09:54:34.000Z",
      "xQuery": "10月値上げラッシュ 家計負担重く"
    },
    {
      "time": "17:56",
      "title": "群馬の女性 死因は出血性ショック",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596632?source=rss",
      "publishedAt": "2026-09-26T08:56:49.000Z",
      "xQuery": "群馬の女性 死因は出血性ショック"
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
