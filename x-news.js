window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T23:50:19.846Z",
  "items": [
    {
      "time": "07:55",
      "title": "20日も広く猛暑日に 熱中症警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588584?source=rss",
      "publishedAt": "2026-07-19T22:55:38.000Z",
      "xQuery": "20日も広く猛暑日に 熱中症警戒"
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
      "time": "07:16",
      "title": "正面衝突で2人死亡1人重体 逆走か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588578?source=rss",
      "publishedAt": "2026-07-19T22:16:27.000Z",
      "xQuery": "正面衝突で2人死亡1人重体 逆走か"
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
      "time": "23:41",
      "title": "老舗酒造会社「越後鶴亀」全焼か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588573?source=rss",
      "publishedAt": "2026-07-19T14:41:18.000Z",
      "xQuery": "老舗酒造会社「越後鶴亀」全焼か"
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
