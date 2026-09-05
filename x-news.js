window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T06:45:49.114Z",
  "items": [
    {
      "time": "14:15",
      "title": "屋久島町の大雨 災害救助法を適用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594299?source=rss",
      "publishedAt": "2026-09-05T05:15:17.000Z",
      "xQuery": "屋久島町の大雨 災害救助法を適用"
    },
    {
      "time": "14:32",
      "title": "中道・小川氏 亀裂拡大防止に苦慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594301?source=rss",
      "publishedAt": "2026-09-05T05:32:47.000Z",
      "xQuery": "中道・小川氏 亀裂拡大防止に苦慮"
    },
    {
      "time": "15:10",
      "title": "死亡の高2 車に1km以上追跡される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594308?source=rss",
      "publishedAt": "2026-09-05T06:10:52.000Z",
      "xQuery": "死亡の高2 車に1km以上追跡される"
    },
    {
      "time": "13:49",
      "title": "まんじゅうをネット転売 通常便で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594297?source=rss",
      "publishedAt": "2026-09-05T04:49:26.000Z",
      "xQuery": "まんじゅうをネット転売 通常便で"
    },
    {
      "time": "13:08",
      "title": "佐藤同士で結婚→離婚 戸籍の動き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594294?source=rss",
      "publishedAt": "2026-09-05T04:08:42.000Z",
      "xQuery": "佐藤同士で結婚→離婚 戸籍の動き"
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
