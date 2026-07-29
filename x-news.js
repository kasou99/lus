window.LUS_X_NEWS = {
  "updatedAt": "2026-07-29T04:37:04.608Z",
  "items": [
    {
      "time": "12:56",
      "title": "九州危険な暑さ 水分や塩分補給を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589766?source=rss",
      "publishedAt": "2026-07-29T03:56:43.000Z",
      "xQuery": "九州危険な暑さ 水分や塩分補給を"
    },
    {
      "time": "11:48",
      "title": "熊本城は臨時休園 石垣28カ所崩落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589747?source=rss",
      "publishedAt": "2026-07-29T02:48:25.000Z",
      "xQuery": "熊本城は臨時休園 石垣28カ所崩落"
    },
    {
      "time": "11:53",
      "title": "内部映像 爆発のイオンモール熊本",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589753?source=rss",
      "publishedAt": "2026-07-29T02:53:21.000Z",
      "xQuery": "内部映像 爆発のイオンモール熊本"
    },
    {
      "time": "12:58",
      "title": "イオン出た後に爆発 視界真っ白",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589764?source=rss",
      "publishedAt": "2026-07-29T03:58:19.000Z",
      "xQuery": "イオン出た後に爆発 視界真っ白"
    },
    {
      "time": "12:22",
      "title": "自宅の下敷きに 兄亡くし男性悲嘆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589759?source=rss",
      "publishedAt": "2026-07-29T03:22:42.000Z",
      "xQuery": "自宅の下敷きに 兄亡くし男性悲嘆"
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
