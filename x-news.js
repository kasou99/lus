window.LUS_X_NEWS = {
  "updatedAt": "2026-07-31T22:25:17.555Z",
  "items": [
    {
      "time": "23:08",
      "title": "熊本地震 揺れの大きさ前回上回る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590081?source=rss",
      "publishedAt": "2026-07-31T14:08:30.000Z",
      "xQuery": "熊本地震 揺れの大きさ前回上回る"
    },
    {
      "time": "07:11",
      "title": "円 一時1ドル157円台半ばまで急騰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590088?source=rss",
      "publishedAt": "2026-07-31T22:11:29.000Z",
      "xQuery": "円 一時1ドル157円台半ばまで急騰"
    },
    {
      "time": "20:46",
      "title": "イオン爆発 娘を亡くした母の心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590068?source=rss",
      "publishedAt": "2026-07-31T11:46:47.000Z",
      "xQuery": "イオン爆発 娘を亡くした母の心境"
    },
    {
      "time": "23:09",
      "title": "男性が刺され死亡 おいの男を確保",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590084?source=rss",
      "publishedAt": "2026-07-31T14:09:35.000Z",
      "xQuery": "男性が刺され死亡 おいの男を確保"
    },
    {
      "time": "23:45",
      "title": "倒れたコンテナに挟まれる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590087?source=rss",
      "publishedAt": "2026-07-31T14:45:41.000Z",
      "xQuery": "倒れたコンテナに挟まれる 死亡"
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
