window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T05:43:24.901Z",
  "items": [
    {
      "time": "14:14",
      "title": "豪雨 放置車の所有者現れるか懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592280?source=rss",
      "publishedAt": "2026-08-19T05:14:55.000Z",
      "xQuery": "豪雨 放置車の所有者現れるか懸念"
    },
    {
      "time": "12:58",
      "title": "米大統領娘婿がハマスと協議 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592273?source=rss",
      "publishedAt": "2026-08-19T03:58:11.000Z",
      "xQuery": "米大統領娘婿がハマスと協議 背景"
    },
    {
      "time": "11:41",
      "title": "従業員逮捕 竹中工務店がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592265?source=rss",
      "publishedAt": "2026-08-19T02:41:31.000Z",
      "xQuery": "従業員逮捕 竹中工務店がコメント"
    },
    {
      "time": "11:37",
      "title": "カリブ海 海藻で各地のビーチ茶色",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592263?source=rss",
      "publishedAt": "2026-08-19T02:37:49.000Z",
      "xQuery": "カリブ海 海藻で各地のビーチ茶色"
    },
    {
      "time": "13:03",
      "title": "必要な便器数の算出基準 見直しへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592277?source=rss",
      "publishedAt": "2026-08-19T04:03:03.000Z",
      "xQuery": "必要な便器数の算出基準 見直しへ"
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
