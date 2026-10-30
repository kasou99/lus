window.LUS_X_NEWS = {
  "updatedAt": "2026-10-30T06:22:25.989Z",
  "items": [
    {
      "time": "14:57",
      "title": "暗号資産交換所大手に不正侵入か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600684?source=rss",
      "publishedAt": "2026-10-30T05:57:34.000Z",
      "xQuery": "暗号資産交換所大手に不正侵入か"
    },
    {
      "time": "13:03",
      "title": "物価上昇目標2%に到達 日銀見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600672?source=rss",
      "publishedAt": "2026-10-30T04:03:56.000Z",
      "xQuery": "物価上昇目標2%に到達 日銀見解"
    },
    {
      "time": "13:51",
      "title": "リースバック 悪質取引に規制強化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600675?source=rss",
      "publishedAt": "2026-10-30T04:51:54.000Z",
      "xQuery": "リースバック 悪質取引に規制強化"
    },
    {
      "time": "12:21",
      "title": "宮古島沖で船火災 1人不明5人救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600667?source=rss",
      "publishedAt": "2026-10-30T03:21:54.000Z",
      "xQuery": "宮古島沖で船火災 1人不明5人救助"
    },
    {
      "time": "14:07",
      "title": "西日本でクマ出没急増 餌不足深刻",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600680?source=rss",
      "publishedAt": "2026-10-30T05:07:46.000Z",
      "xQuery": "西日本でクマ出没急増 餌不足深刻"
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
