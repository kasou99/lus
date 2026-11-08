window.LUS_X_NEWS = {
  "updatedAt": "2026-11-08T19:36:43.630Z",
  "items": [
    {
      "time": "22:13",
      "title": "欧州右派政党 トランプ氏離れ鮮明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601843?source=rss",
      "publishedAt": "2026-11-08T13:13:17.000Z",
      "xQuery": "欧州右派政党 トランプ氏離れ鮮明"
    },
    {
      "time": "23:28",
      "title": "日米外相会談 パリG7合わせ調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601851?source=rss",
      "publishedAt": "2026-11-08T14:28:33.000Z",
      "xQuery": "日米外相会談 パリG7合わせ調整"
    },
    {
      "time": "23:39",
      "title": "福井の山中に女性遺体 死因は窒息",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601853?source=rss",
      "publishedAt": "2026-11-08T14:39:31.000Z",
      "xQuery": "福井の山中に女性遺体 死因は窒息"
    },
    {
      "time": "22:16",
      "title": "死産の子に産着無償提供 広がる輪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601845?source=rss",
      "publishedAt": "2026-11-08T13:16:47.000Z",
      "xQuery": "死産の子に産着無償提供 広がる輪"
    },
    {
      "time": "22:24",
      "title": "商品に個体差「不揃い」バズる訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601846?source=rss",
      "publishedAt": "2026-11-08T13:24:35.000Z",
      "xQuery": "商品に個体差「不揃い」バズる訳"
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
