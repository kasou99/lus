window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T14:18:59.280Z",
  "items": [
    {
      "time": "20:46",
      "title": "皇族数確保策 審議「中継入り」に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587218?source=rss",
      "publishedAt": "2026-07-08T11:46:29.000Z",
      "xQuery": "皇族数確保策 審議「中継入り」に"
    },
    {
      "time": "22:34",
      "title": "中国SLBM 事前通知の透明性は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587227?source=rss",
      "publishedAt": "2026-07-08T13:34:22.000Z",
      "xQuery": "中国SLBM 事前通知の透明性は"
    },
    {
      "time": "22:19",
      "title": "カツアゲ告発県議 逆に百万円受領",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587223?source=rss",
      "publishedAt": "2026-07-08T13:19:50.000Z",
      "xQuery": "カツアゲ告発県議 逆に百万円受領"
    },
    {
      "time": "22:19",
      "title": "検事 元容疑者の女性と不適切交際",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587225?source=rss",
      "publishedAt": "2026-07-08T13:19:10.000Z",
      "xQuery": "検事 元容疑者の女性と不適切交際"
    },
    {
      "time": "22:45",
      "title": "唇を縫い付けた疑い 共犯もいたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587226?source=rss",
      "publishedAt": "2026-07-08T13:45:37.000Z",
      "xQuery": "唇を縫い付けた疑い 共犯もいたか"
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
