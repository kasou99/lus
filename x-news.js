window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T23:33:30.025Z",
  "items": [
    {
      "time": "07:45",
      "title": "米イラン 21日からスイスで協議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585035?source=rss",
      "publishedAt": "2026-06-20T22:45:53.000Z",
      "xQuery": "米イラン 21日からスイスで協議へ"
    },
    {
      "time": "23:51",
      "title": "イラン ホルムズを封鎖したと声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585027?source=rss",
      "publishedAt": "2026-06-20T14:51:14.000Z",
      "xQuery": "イラン ホルムズを封鎖したと声明"
    },
    {
      "time": "07:32",
      "title": "政府 北極政策の基本方針改定検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585032?source=rss",
      "publishedAt": "2026-06-20T22:32:26.000Z",
      "xQuery": "政府 北極政策の基本方針改定検討"
    },
    {
      "time": "07:36",
      "title": "冷凍庫から遺体 損壊され腐敗進む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585033?source=rss",
      "publishedAt": "2026-06-20T22:36:08.000Z",
      "xQuery": "冷凍庫から遺体 損壊され腐敗進む"
    },
    {
      "time": "07:39",
      "title": "公園でランニング中 男性刺される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585034?source=rss",
      "publishedAt": "2026-06-20T22:39:13.000Z",
      "xQuery": "公園でランニング中 男性刺される"
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
