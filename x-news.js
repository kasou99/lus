window.LUS_X_NEWS = {
  "updatedAt": "2026-05-21T05:34:34.208Z",
  "items": [
    {
      "time": "12:01",
      "title": "習主席が近く訪朝か 韓国側注視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581071?source=rss",
      "publishedAt": "2026-05-21T03:01:40.000Z",
      "xQuery": "習主席が近く訪朝か 韓国側注視"
    },
    {
      "time": "11:20",
      "title": "中国で切り付け 在留邦人は不安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581064?source=rss",
      "publishedAt": "2026-05-21T02:20:14.000Z",
      "xQuery": "中国で切り付け 在留邦人は不安"
    },
    {
      "time": "13:23",
      "title": "法廷内の無断録音 東電でも発覚",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581085?source=rss",
      "publishedAt": "2026-05-21T04:23:03.000Z",
      "xQuery": "法廷内の無断録音 東電でも発覚"
    },
    {
      "time": "11:42",
      "title": "森永製菓 キャラメル2商品を休売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581067?source=rss",
      "publishedAt": "2026-05-21T02:42:20.000Z",
      "xQuery": "森永製菓 キャラメル2商品を休売"
    },
    {
      "time": "13:50",
      "title": "酒税改正へ ビール業界競争変化か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581090?source=rss",
      "publishedAt": "2026-05-21T04:50:40.000Z",
      "xQuery": "酒税改正へ ビール業界競争変化か"
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
