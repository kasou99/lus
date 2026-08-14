window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T11:18:42.532Z",
  "items": [
    {
      "time": "19:41",
      "title": "関東など 15日にかけ激しい雨注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591730?source=rss",
      "publishedAt": "2026-08-14T10:41:09.000Z",
      "xQuery": "関東など 15日にかけ激しい雨注意"
    },
    {
      "time": "19:53",
      "title": "千葉豪雨 放置車両1200台超見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591735?source=rss",
      "publishedAt": "2026-08-14T10:53:47.000Z",
      "xQuery": "千葉豪雨 放置車両1200台超見通し"
    },
    {
      "time": "17:34",
      "title": "声届かず沈む車 住民が窓割り救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591716?source=rss",
      "publishedAt": "2026-08-14T08:34:08.000Z",
      "xQuery": "声届かず沈む車 住民が窓割り救助"
    },
    {
      "time": "20:15",
      "title": "深夜の爆音「走り屋」の言い分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591741?source=rss",
      "publishedAt": "2026-08-14T11:15:33.000Z",
      "xQuery": "深夜の爆音「走り屋」の言い分"
    },
    {
      "time": "17:44",
      "title": "初任給100万円の会社 応募1300人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591715?source=rss",
      "publishedAt": "2026-08-14T08:44:04.000Z",
      "xQuery": "初任給100万円の会社 応募1300人"
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
