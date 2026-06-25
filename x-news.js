window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T16:54:12.046Z",
  "items": [
    {
      "time": "21:39",
      "title": "皇室典範改正案要綱 与野党に賛否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585663?source=rss",
      "publishedAt": "2026-06-25T12:39:44.000Z",
      "xQuery": "皇室典範改正案要綱 与野党に賛否"
    },
    {
      "time": "22:06",
      "title": "認知症の行方不明者 昨年1.7万人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585665?source=rss",
      "publishedAt": "2026-06-25T13:06:54.000Z",
      "xQuery": "認知症の行方不明者 昨年1.7万人"
    },
    {
      "time": "23:41",
      "title": "スクールバス逆走し事故 12人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585674?source=rss",
      "publishedAt": "2026-06-25T14:41:18.000Z",
      "xQuery": "スクールバス逆走し事故 12人搬送"
    },
    {
      "time": "22:31",
      "title": "メキシコ W杯の群衆に車突っ込む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585671?source=rss",
      "publishedAt": "2026-06-25T13:31:52.000Z",
      "xQuery": "メキシコ W杯の群衆に車突っ込む"
    },
    {
      "time": "21:55",
      "title": "任天堂29年に技術新拠点 1210億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585664?source=rss",
      "publishedAt": "2026-06-25T12:55:01.000Z",
      "xQuery": "任天堂29年に技術新拠点 1210億円"
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
