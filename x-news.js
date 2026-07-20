window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T14:18:12.436Z",
  "items": [
    {
      "time": "21:43",
      "title": "42都府県に熱中症警戒アラート",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588679?source=rss",
      "publishedAt": "2026-07-20T12:43:06.000Z",
      "xQuery": "42都府県に熱中症警戒アラート"
    },
    {
      "time": "21:34",
      "title": "消費減税 自民要職経験者が慎重論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588677?source=rss",
      "publishedAt": "2026-07-20T12:34:59.000Z",
      "xQuery": "消費減税 自民要職経験者が慎重論"
    },
    {
      "time": "23:12",
      "title": "中露 日本のEEZ内で実弾演習",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588686?source=rss",
      "publishedAt": "2026-07-20T14:12:12.000Z",
      "xQuery": "中露 日本のEEZ内で実弾演習"
    },
    {
      "time": "22:08",
      "title": "港の岸壁で倒れていた男性 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588680?source=rss",
      "publishedAt": "2026-07-20T13:08:47.000Z",
      "xQuery": "港の岸壁で倒れていた男性 死亡"
    },
    {
      "time": "23:03",
      "title": "市長産休入り 妊娠後も多忙な日々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588685?source=rss",
      "publishedAt": "2026-07-20T14:03:56.000Z",
      "xQuery": "市長産休入り 妊娠後も多忙な日々"
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
