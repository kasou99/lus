window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T01:46:27.489Z",
  "items": [
    {
      "time": "09:55",
      "title": "最低賃金 政治圧力緩み競争が一服",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594171?source=rss",
      "publishedAt": "2026-09-04T00:55:23.000Z",
      "xQuery": "最低賃金 政治圧力緩み競争が一服"
    },
    {
      "time": "09:14",
      "title": "米中間選挙 共和牙城で異例の接戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594166?source=rss",
      "publishedAt": "2026-09-04T00:14:21.000Z",
      "xQuery": "米中間選挙 共和牙城で異例の接戦"
    },
    {
      "time": "09:24",
      "title": "闇サイト殺人 娘が伝えたウソ番号",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594164?source=rss",
      "publishedAt": "2026-09-04T00:24:59.000Z",
      "xQuery": "闇サイト殺人 娘が伝えたウソ番号"
    },
    {
      "time": "08:36",
      "title": "大型トラックが車に追突 2人死傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594161?source=rss",
      "publishedAt": "2026-09-03T23:36:17.000Z",
      "xQuery": "大型トラックが車に追突 2人死傷"
    },
    {
      "time": "10:12",
      "title": "退職代行 弁護士参入で存在感薄れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594173?source=rss",
      "publishedAt": "2026-09-04T01:12:25.000Z",
      "xQuery": "退職代行 弁護士参入で存在感薄れ"
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
