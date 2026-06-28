window.LUS_X_NEWS = {
  "updatedAt": "2026-06-28T02:25:14.113Z",
  "items": [
    {
      "time": "10:25",
      "title": "法廷で無断録音 電力会社の内情",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585968?source=rss",
      "publishedAt": "2026-06-28T01:25:48.000Z",
      "xQuery": "法廷で無断録音 電力会社の内情"
    },
    {
      "time": "08:51",
      "title": "米軍 イランの複数標的を空爆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585957?source=rss",
      "publishedAt": "2026-06-27T23:51:17.000Z",
      "xQuery": "米軍 イランの複数標的を空爆"
    },
    {
      "time": "09:27",
      "title": "ドイツで41.5度 最高気温を更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585961?source=rss",
      "publishedAt": "2026-06-28T00:27:29.000Z",
      "xQuery": "ドイツで41.5度 最高気温を更新"
    },
    {
      "time": "09:36",
      "title": "いいね購入?「スマホ農場」とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585963?source=rss",
      "publishedAt": "2026-06-28T00:36:21.000Z",
      "xQuery": "いいね購入?「スマホ農場」とは"
    },
    {
      "time": "08:29",
      "title": "奥様は失礼? 配偶者呼び方に悩み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585953?source=rss",
      "publishedAt": "2026-06-27T23:29:03.000Z",
      "xQuery": "奥様は失礼? 配偶者呼び方に悩み"
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
