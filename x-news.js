window.LUS_X_NEWS = {
  "updatedAt": "2026-11-03T23:09:43.246Z",
  "items": [
    {
      "time": "07:56",
      "title": "米中間選挙 予測市場精度問われる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601249?source=rss",
      "publishedAt": "2026-11-03T22:56:39.000Z",
      "xQuery": "米中間選挙 予測市場精度問われる"
    },
    {
      "time": "07:30",
      "title": "欧州で旅客機への爆破予告相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601246?source=rss",
      "publishedAt": "2026-11-03T22:30:44.000Z",
      "xQuery": "欧州で旅客機への爆破予告相次ぐ"
    },
    {
      "time": "07:30",
      "title": "米大統領 イスラエル支援終了発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601244?source=rss",
      "publishedAt": "2026-11-03T22:30:01.000Z",
      "xQuery": "米大統領 イスラエル支援終了発表"
    },
    {
      "time": "06:21",
      "title": "路上に血を流した女性 搬送も重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601239?source=rss",
      "publishedAt": "2026-11-03T21:21:42.000Z",
      "xQuery": "路上に血を流した女性 搬送も重体"
    },
    {
      "time": "07:43",
      "title": "マンホールカード人気 トラブルも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601247?source=rss",
      "publishedAt": "2026-11-03T22:43:59.000Z",
      "xQuery": "マンホールカード人気 トラブルも"
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
