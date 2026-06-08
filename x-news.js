window.LUS_X_NEWS = {
  "updatedAt": "2026-06-08T22:06:56.641Z",
  "items": [
    {
      "time": "20:54",
      "title": "皇族確保策「総意」案に7党賛成",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583477?source=rss",
      "publishedAt": "2026-06-08T11:54:54.000Z",
      "xQuery": "皇族確保策「総意」案に7党賛成"
    },
    {
      "time": "22:15",
      "title": "イラン 対イスラエル作戦一時停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583485?source=rss",
      "publishedAt": "2026-06-08T13:15:49.000Z",
      "xQuery": "イラン 対イスラエル作戦一時停止"
    },
    {
      "time": "06:46",
      "title": "日韓関係「良い」59%で最高 読売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583498?source=rss",
      "publishedAt": "2026-06-08T21:46:05.000Z",
      "xQuery": "日韓関係「良い」59%で最高 読売"
    },
    {
      "time": "06:08",
      "title": "車3台絡む事故 生後8カ月男児重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583496?source=rss",
      "publishedAt": "2026-06-08T21:08:33.000Z",
      "xQuery": "車3台絡む事故 生後8カ月男児重体"
    },
    {
      "time": "21:34",
      "title": "高3で妊娠 37歳で娘と同じ高校に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583482?source=rss",
      "publishedAt": "2026-06-08T12:34:09.000Z",
      "xQuery": "高3で妊娠 37歳で娘と同じ高校に"
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
