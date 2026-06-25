window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T13:19:19.183Z",
  "items": [
    {
      "time": "20:51",
      "title": "最低賃金の目標 先延ばしで調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585655?source=rss",
      "publishedAt": "2026-06-25T11:51:51.000Z",
      "xQuery": "最低賃金の目標 先延ばしで調整"
    },
    {
      "time": "20:40",
      "title": "ベネズエラM7超地震 164人が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585654?source=rss",
      "publishedAt": "2026-06-25T11:40:23.000Z",
      "xQuery": "ベネズエラM7超地震 164人が死亡"
    },
    {
      "time": "22:07",
      "title": "スクールバス絡む事故 12人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585666?source=rss",
      "publishedAt": "2026-06-25T13:07:57.000Z",
      "xQuery": "スクールバス絡む事故 12人搬送"
    },
    {
      "time": "18:40",
      "title": "10代の娘に性的暴行疑い 父を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585646?source=rss",
      "publishedAt": "2026-06-25T09:40:10.000Z",
      "xQuery": "10代の娘に性的暴行疑い 父を逮捕"
    },
    {
      "time": "14:29",
      "title": "任天堂と海外大手 課題の違いとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585608?source=rss",
      "publishedAt": "2026-06-25T05:29:27.000Z",
      "xQuery": "任天堂と海外大手 課題の違いとは"
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
