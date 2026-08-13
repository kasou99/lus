window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T23:47:59.537Z",
  "items": [
    {
      "time": "05:42",
      "title": "千葉県の特別警報 危険警報に切替",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591650?source=rss",
      "publishedAt": "2026-08-13T20:42:44.000Z",
      "xQuery": "千葉県の特別警報 危険警報に切替"
    },
    {
      "time": "05:29",
      "title": "危険な雨 土砂災害など終日警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591649?source=rss",
      "publishedAt": "2026-08-13T20:29:37.000Z",
      "xQuery": "危険な雨 土砂災害など終日警戒"
    },
    {
      "time": "08:45",
      "title": "千葉大雨の死者4人に 行方不明1人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591663?source=rss",
      "publishedAt": "2026-08-13T23:45:37.000Z",
      "xQuery": "千葉大雨の死者4人に 行方不明1人"
    },
    {
      "time": "06:40",
      "title": "千葉県内 約1万人の帰宅困難者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591653?source=rss",
      "publishedAt": "2026-08-13T21:40:22.000Z",
      "xQuery": "千葉県内 約1万人の帰宅困難者"
    },
    {
      "time": "08:28",
      "title": "一夜明けた千葉 上空からの映像",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591661?source=rss",
      "publishedAt": "2026-08-13T23:28:49.000Z",
      "xQuery": "一夜明けた千葉 上空からの映像"
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
