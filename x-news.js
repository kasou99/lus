window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T00:50:28.609Z",
  "items": [
    {
      "time": "09:06",
      "title": "米国の対イラン攻撃 範囲が拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588597?source=rss",
      "publishedAt": "2026-07-20T00:06:20.000Z",
      "xQuery": "米国の対イラン攻撃 範囲が拡大"
    },
    {
      "time": "08:04",
      "title": "皇室典範 国民の理解得られぬ60%",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588583?source=rss",
      "publishedAt": "2026-07-19T23:04:40.000Z",
      "xQuery": "皇室典範 国民の理解得られぬ60%"
    },
    {
      "time": "08:25",
      "title": "3歳男児ひかれ死亡 1人で道路渡る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588587?source=rss",
      "publishedAt": "2026-07-19T23:25:49.000Z",
      "xQuery": "3歳男児ひかれ死亡 1人で道路渡る"
    },
    {
      "time": "08:37",
      "title": "アルツハイマー病巡り新発見 研究",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588590?source=rss",
      "publishedAt": "2026-07-19T23:37:43.000Z",
      "xQuery": "アルツハイマー病巡り新発見 研究"
    },
    {
      "time": "09:33",
      "title": "今も地方に残る「ヤミ小作」実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588599?source=rss",
      "publishedAt": "2026-07-20T00:33:33.000Z",
      "xQuery": "今も地方に残る「ヤミ小作」実態"
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
