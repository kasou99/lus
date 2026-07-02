window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T09:38:25.719Z",
  "items": [
    {
      "time": "17:51",
      "title": "電通総研の株式非公開化を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586487?source=rss",
      "publishedAt": "2026-07-02T08:51:04.000Z",
      "xQuery": "電通総研の株式非公開化を検討"
    },
    {
      "time": "18:16",
      "title": "ウ首都に大規模攻撃 13人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586493?source=rss",
      "publishedAt": "2026-07-02T09:16:19.000Z",
      "xQuery": "ウ首都に大規模攻撃 13人死亡"
    },
    {
      "time": "15:29",
      "title": "大手夏のボーナス 初の100万円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586469?source=rss",
      "publishedAt": "2026-07-02T06:29:07.000Z",
      "xQuery": "大手夏のボーナス 初の100万円超"
    },
    {
      "time": "18:18",
      "title": "制裁金巡りGoogle敗訴 EU司法裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586491?source=rss",
      "publishedAt": "2026-07-02T09:18:15.000Z",
      "xQuery": "制裁金巡りGoogle敗訴 EU司法裁"
    },
    {
      "time": "15:49",
      "title": "タイミー側は争う姿勢 集団訴訟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586471?source=rss",
      "publishedAt": "2026-07-02T06:49:29.000Z",
      "xQuery": "タイミー側は争う姿勢 集団訴訟"
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
