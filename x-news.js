window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T07:12:33.449Z",
  "items": [
    {
      "time": "13:52",
      "title": "米民主党が両院で過半数確実 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601295?source=rss",
      "publishedAt": "2026-11-04T04:52:02.000Z",
      "xQuery": "米民主党が両院で過半数確実 報道"
    },
    {
      "time": "13:36",
      "title": "テキサス州上院 38年ぶり民主勝利",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601292?source=rss",
      "publishedAt": "2026-11-04T04:36:32.000Z",
      "xQuery": "テキサス州上院 38年ぶり民主勝利"
    },
    {
      "time": "14:14",
      "title": "トランプ氏 選挙結果受け入れ表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601299?source=rss",
      "publishedAt": "2026-11-04T05:14:21.000Z",
      "xQuery": "トランプ氏 選挙結果受け入れ表明"
    },
    {
      "time": "15:23",
      "title": "BYD海外販売が倍増 中国車に明暗",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601278?source=rss",
      "publishedAt": "2026-11-04T06:23:32.000Z",
      "xQuery": "BYD海外販売が倍増 中国車に明暗"
    },
    {
      "time": "12:45",
      "title": "担任が生徒と「交際」裁判長断罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601289?source=rss",
      "publishedAt": "2026-11-04T03:45:12.000Z",
      "xQuery": "担任が生徒と「交際」裁判長断罪"
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
