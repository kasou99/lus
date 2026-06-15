window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T22:49:23.924Z",
  "items": [
    {
      "time": "07:22",
      "title": "9カ国共同声明 米イラン覚書歓迎",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584401?source=rss",
      "publishedAt": "2026-06-15T22:22:37.000Z",
      "xQuery": "9カ国共同声明 米イラン覚書歓迎"
    },
    {
      "time": "07:15",
      "title": "NYダウ終値468ドル高 最高値更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584402?source=rss",
      "publishedAt": "2026-06-15T22:15:20.000Z",
      "xQuery": "NYダウ終値468ドル高 最高値更新"
    },
    {
      "time": "07:34",
      "title": "はさみで知人女性刺した疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584406?source=rss",
      "publishedAt": "2026-06-15T22:34:09.000Z",
      "xQuery": "はさみで知人女性刺した疑い 逮捕"
    },
    {
      "time": "22:13",
      "title": "飼いネコ4匹 サルに襲われて死ぬ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584388?source=rss",
      "publishedAt": "2026-06-15T13:13:14.000Z",
      "xQuery": "飼いネコ4匹 サルに襲われて死ぬ"
    },
    {
      "time": "06:35",
      "title": "物価高対策P詐取疑い 15歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584399?source=rss",
      "publishedAt": "2026-06-15T21:35:41.000Z",
      "xQuery": "物価高対策P詐取疑い 15歳を逮捕"
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
