window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T03:10:21.713Z",
  "items": [
    {
      "time": "11:55",
      "title": "青森県などで震度4 津波心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590127?source=rss",
      "publishedAt": "2026-08-01T02:55:55.000Z",
      "xQuery": "青森県などで震度4 津波心配なし"
    },
    {
      "time": "10:53",
      "title": "首相 3日に熊本の被災地訪問へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590118?source=rss",
      "publishedAt": "2026-08-01T01:53:01.000Z",
      "xQuery": "首相 3日に熊本の被災地訪問へ"
    },
    {
      "time": "11:12",
      "title": "市川のマンションで爆発 周辺被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590119?source=rss",
      "publishedAt": "2026-08-01T02:12:29.000Z",
      "xQuery": "市川のマンションで爆発 周辺被害"
    },
    {
      "time": "09:32",
      "title": "流星群も 8月天体ショー目白押し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590110?source=rss",
      "publishedAt": "2026-08-01T00:32:37.000Z",
      "xQuery": "流星群も 8月天体ショー目白押し"
    },
    {
      "time": "08:48",
      "title": "エルニーニョ現象 さらに発達予測",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590103?source=rss",
      "publishedAt": "2026-07-31T23:48:17.000Z",
      "xQuery": "エルニーニョ現象 さらに発達予測"
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
