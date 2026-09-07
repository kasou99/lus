window.LUS_X_NEWS = {
  "updatedAt": "2026-09-07T02:45:29.137Z",
  "items": [
    {
      "time": "11:05",
      "title": "関東南部・東北など 土砂災害警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594509?source=rss",
      "publishedAt": "2026-09-07T02:05:02.000Z",
      "xQuery": "関東南部・東北など 土砂災害警戒"
    },
    {
      "time": "05:35",
      "title": "東京・新島村に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594482?source=rss",
      "publishedAt": "2026-09-06T20:35:37.000Z",
      "xQuery": "東京・新島村に特別警報 最新情報"
    },
    {
      "time": "10:23",
      "title": "車2台水没し1人意識不明 いわき市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594505?source=rss",
      "publishedAt": "2026-09-07T01:23:03.000Z",
      "xQuery": "車2台水没し1人意識不明 いわき市"
    },
    {
      "time": "10:50",
      "title": "大雨で道路影響 無理な移動避けて",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594508?source=rss",
      "publishedAt": "2026-09-07T01:50:36.000Z",
      "xQuery": "大雨で道路影響 無理な移動避けて"
    },
    {
      "time": "10:13",
      "title": "貨物機オーバーランし5人死亡 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594502?source=rss",
      "publishedAt": "2026-09-07T01:13:25.000Z",
      "xQuery": "貨物機オーバーランし5人死亡 米"
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
