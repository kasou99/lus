window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T23:38:55.527Z",
  "items": [
    {
      "time": "07:45",
      "title": "カナダ首相 対米報復関税を発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592725?source=rss",
      "publishedAt": "2026-08-22T22:45:26.000Z",
      "xQuery": "カナダ首相 対米報復関税を発表"
    },
    {
      "time": "07:23",
      "title": "震度5弱 関東の鉄道運行情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592722?source=rss",
      "publishedAt": "2026-08-22T22:23:25.000Z",
      "xQuery": "震度5弱 関東の鉄道運行情報"
    },
    {
      "time": "07:45",
      "title": "震度5弱 江東区では道路に水流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592723?source=rss",
      "publishedAt": "2026-08-22T22:45:17.000Z",
      "xQuery": "震度5弱 江東区では道路に水流出"
    },
    {
      "time": "07:44",
      "title": "タイ南部3県 爆発や放火相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592726?source=rss",
      "publishedAt": "2026-08-22T22:44:56.000Z",
      "xQuery": "タイ南部3県 爆発や放火相次ぐ"
    },
    {
      "time": "07:26",
      "title": "薬師寺国宝に液体かけた疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592721?source=rss",
      "publishedAt": "2026-08-22T22:26:20.000Z",
      "xQuery": "薬師寺国宝に液体かけた疑い 逮捕"
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
