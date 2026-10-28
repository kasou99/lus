window.LUS_X_NEWS = {
  "updatedAt": "2026-10-28T23:11:22.371Z",
  "items": [
    {
      "time": "06:55",
      "title": "GMO脅迫サイト 国が遮断を要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600494?source=rss",
      "publishedAt": "2026-10-28T21:55:03.000Z",
      "xQuery": "GMO脅迫サイト 国が遮断を要請"
    },
    {
      "time": "08:03",
      "title": "スペイン 衝突列車に誤った指示か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600500?source=rss",
      "publishedAt": "2026-10-28T23:03:35.000Z",
      "xQuery": "スペイン 衝突列車に誤った指示か"
    },
    {
      "time": "07:18",
      "title": "解体作業中に鉄板が落下 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600496?source=rss",
      "publishedAt": "2026-10-28T22:18:06.000Z",
      "xQuery": "解体作業中に鉄板が落下 男性死亡"
    },
    {
      "time": "21:24",
      "title": "「千鳥饅頭」千鳥屋本家が破産へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600474?source=rss",
      "publishedAt": "2026-10-28T12:24:14.000Z",
      "xQuery": "「千鳥饅頭」千鳥屋本家が破産へ"
    },
    {
      "time": "06:09",
      "title": "巨人ヘッドCに高橋由伸氏決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600491?source=rss",
      "publishedAt": "2026-10-28T21:09:28.000Z",
      "xQuery": "巨人ヘッドCに高橋由伸氏決定"
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
