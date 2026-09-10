window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T17:15:36.977Z",
  "items": [
    {
      "time": "23:28",
      "title": "関東など 通勤時間帯に雷雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594906?source=rss",
      "publishedAt": "2026-09-10T14:28:13.000Z",
      "xQuery": "関東など 通勤時間帯に雷雨の恐れ"
    },
    {
      "time": "22:47",
      "title": "欧州中銀 0.25%の利上げ決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594903?source=rss",
      "publishedAt": "2026-09-10T13:47:04.000Z",
      "xQuery": "欧州中銀 0.25%の利上げ決定"
    },
    {
      "time": "22:14",
      "title": "半導体巡る日中摩擦 企業に影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594883?source=rss",
      "publishedAt": "2026-09-10T13:14:56.000Z",
      "xQuery": "半導体巡る日中摩擦 企業に影響は"
    },
    {
      "time": "21:04",
      "title": "3台絡む事故で3人死傷 逆走と通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594899?source=rss",
      "publishedAt": "2026-09-10T12:04:21.000Z",
      "xQuery": "3台絡む事故で3人死傷 逆走と通報"
    },
    {
      "time": "23:47",
      "title": "富士山閉山期 登山届の義務化検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594907?source=rss",
      "publishedAt": "2026-09-10T14:47:18.000Z",
      "xQuery": "富士山閉山期 登山届の義務化検討"
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
