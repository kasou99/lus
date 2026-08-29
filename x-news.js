window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T10:14:34.067Z",
  "items": [
    {
      "time": "15:15",
      "title": "避難3日目迎え疲労の色 石川富山",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593510?source=rss",
      "publishedAt": "2026-08-29T06:15:38.000Z",
      "xQuery": "避難3日目迎え疲労の色 石川富山"
    },
    {
      "time": "18:49",
      "title": "津波想定34m 変化する町民の行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593542?source=rss",
      "publishedAt": "2026-08-29T09:49:20.000Z",
      "xQuery": "津波想定34m 変化する町民の行動"
    },
    {
      "time": "18:34",
      "title": "海で流され不明の中高生3人 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593541?source=rss",
      "publishedAt": "2026-08-29T09:34:51.000Z",
      "xQuery": "海で流され不明の中高生3人 死亡"
    },
    {
      "time": "18:56",
      "title": "観光客らバイク通行 吊り橋が危機",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593543?source=rss",
      "publishedAt": "2026-08-29T09:56:23.000Z",
      "xQuery": "観光客らバイク通行 吊り橋が危機"
    },
    {
      "time": "12:37",
      "title": "「皇居ラン」に苦情 区の担当者は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593494?source=rss",
      "publishedAt": "2026-08-29T03:37:36.000Z",
      "xQuery": "「皇居ラン」に苦情 区の担当者は"
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
