window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T09:42:37.506Z",
  "items": [
    {
      "time": "18:19",
      "title": "16日も危険な暑さ 熱中症に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588062?source=rss",
      "publishedAt": "2026-07-15T09:19:51.000Z",
      "xQuery": "16日も危険な暑さ 熱中症に警戒"
    },
    {
      "time": "17:56",
      "title": "「副首都」法案 衆院特別委で可決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588058?source=rss",
      "publishedAt": "2026-07-15T08:56:07.000Z",
      "xQuery": "「副首都」法案 衆院特別委で可決"
    },
    {
      "time": "17:12",
      "title": "小3男児がはねられ死亡 西東京市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588048?source=rss",
      "publishedAt": "2026-07-15T08:12:50.000Z",
      "xQuery": "小3男児がはねられ死亡 西東京市"
    },
    {
      "time": "17:38",
      "title": "点滴に大便入れ患者殺害疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588054?source=rss",
      "publishedAt": "2026-07-15T08:38:43.000Z",
      "xQuery": "点滴に大便入れ患者殺害疑い 逮捕"
    },
    {
      "time": "16:50",
      "title": "通話アプリPOPOPO 半年で終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588045?source=rss",
      "publishedAt": "2026-07-15T07:50:46.000Z",
      "xQuery": "通話アプリPOPOPO 半年で終了へ"
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
