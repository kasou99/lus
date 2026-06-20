window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T19:37:16.894Z",
  "items": [
    {
      "time": "23:51",
      "title": "イラン ホルムズを封鎖したと声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585027?source=rss",
      "publishedAt": "2026-06-20T14:51:14.000Z",
      "xQuery": "イラン ホルムズを封鎖したと声明"
    },
    {
      "time": "22:35",
      "title": "北陸・東北中心に激しい雷雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585018?source=rss",
      "publishedAt": "2026-06-20T13:35:59.000Z",
      "xQuery": "北陸・東北中心に激しい雷雨恐れ"
    },
    {
      "time": "21:43",
      "title": "マンションで損壊された遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585012?source=rss",
      "publishedAt": "2026-06-20T12:43:01.000Z",
      "xQuery": "マンションで損壊された遺体発見"
    },
    {
      "time": "22:28",
      "title": "病院の駐車場ではねられる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585020?source=rss",
      "publishedAt": "2026-06-20T13:28:23.000Z",
      "xQuery": "病院の駐車場ではねられる 死亡"
    },
    {
      "time": "23:03",
      "title": "崖から80m転落か 釣りの男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585022?source=rss",
      "publishedAt": "2026-06-20T14:03:59.000Z",
      "xQuery": "崖から80m転落か 釣りの男性死亡"
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
