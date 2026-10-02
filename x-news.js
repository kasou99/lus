window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T11:41:18.666Z",
  "items": [
    {
      "time": "18:18",
      "title": "簗氏 予算削減発言おおむね認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597305?source=rss",
      "publishedAt": "2026-10-02T09:18:29.000Z",
      "xQuery": "簗氏 予算削減発言おおむね認める"
    },
    {
      "time": "17:14",
      "title": "免許証画像流出 集団訴訟動き進む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597293?source=rss",
      "publishedAt": "2026-10-02T08:14:52.000Z",
      "xQuery": "免許証画像流出 集団訴訟動き進む"
    },
    {
      "time": "18:10",
      "title": "紀州ドンファンの遺言有効 最高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597303?source=rss",
      "publishedAt": "2026-10-02T09:10:37.000Z",
      "xQuery": "紀州ドンファンの遺言有効 最高裁"
    },
    {
      "time": "19:44",
      "title": "山中でシカに襲われたか 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597314?source=rss",
      "publishedAt": "2026-10-02T10:44:15.000Z",
      "xQuery": "山中でシカに襲われたか 男性死亡"
    },
    {
      "time": "20:10",
      "title": "スガキヤが「ドムドム」子会社化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597315?source=rss",
      "publishedAt": "2026-10-02T11:10:40.000Z",
      "xQuery": "スガキヤが「ドムドム」子会社化"
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
