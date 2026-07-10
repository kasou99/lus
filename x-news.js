window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T22:51:54.571Z",
  "items": [
    {
      "time": "07:20",
      "title": "台風9号が先島諸島に最接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587489?source=rss",
      "publishedAt": "2026-07-10T22:20:58.000Z",
      "xQuery": "台風9号が先島諸島に最接近 警戒"
    },
    {
      "time": "06:26",
      "title": "米イラン協議 近く再開する可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587484?source=rss",
      "publishedAt": "2026-07-10T21:26:08.000Z",
      "xQuery": "米イラン協議 近く再開する可能性"
    },
    {
      "time": "07:24",
      "title": "取り調べで罵倒 検察官が無罪主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587491?source=rss",
      "publishedAt": "2026-07-10T22:24:04.000Z",
      "xQuery": "取り調べで罵倒 検察官が無罪主張"
    },
    {
      "time": "07:31",
      "title": "ビル1室で3千社起業 経営実態は?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587492?source=rss",
      "publishedAt": "2026-07-10T22:31:14.000Z",
      "xQuery": "ビル1室で3千社起業 経営実態は?"
    },
    {
      "time": "07:25",
      "title": "EU インスタ中毒性に設計変更を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587490?source=rss",
      "publishedAt": "2026-07-10T22:25:47.000Z",
      "xQuery": "EU インスタ中毒性に設計変更を"
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
