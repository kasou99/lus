window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T12:46:47.532Z",
  "items": [
    {
      "time": "18:58",
      "title": "生活道路の30km/h制限 周知に課題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593887?source=rss",
      "publishedAt": "2026-09-01T09:58:06.000Z",
      "xQuery": "生活道路の30km/h制限 周知に課題"
    },
    {
      "time": "16:43",
      "title": "ガソリン補助に6136億円 閣議決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593867?source=rss",
      "publishedAt": "2026-09-01T07:43:51.000Z",
      "xQuery": "ガソリン補助に6136億円 閣議決定"
    },
    {
      "time": "21:03",
      "title": "車にはねられ女性死亡 75歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593900?source=rss",
      "publishedAt": "2026-09-01T12:03:08.000Z",
      "xQuery": "車にはねられ女性死亡 75歳逮捕"
    },
    {
      "time": "20:30",
      "title": "キユーピー マヨネーズなど値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593895?source=rss",
      "publishedAt": "2026-09-01T11:30:10.000Z",
      "xQuery": "キユーピー マヨネーズなど値上げ"
    },
    {
      "time": "20:15",
      "title": "図書館で大量の本が所在不明 宮城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593894?source=rss",
      "publishedAt": "2026-09-01T11:15:44.000Z",
      "xQuery": "図書館で大量の本が所在不明 宮城"
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
