window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T04:45:43.489Z",
  "items": [
    {
      "time": "12:32",
      "title": "公明 新代表に岡本三成氏就任へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597050?source=rss",
      "publishedAt": "2026-09-30T03:32:01.000Z",
      "xQuery": "公明 新代表に岡本三成氏就任へ"
    },
    {
      "time": "11:59",
      "title": "飲食料品値上げ 10月は3153品目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597045?source=rss",
      "publishedAt": "2026-09-30T02:59:15.000Z",
      "xQuery": "飲食料品値上げ 10月は3153品目"
    },
    {
      "time": "11:29",
      "title": "アパートで20代女性死亡 男を確保",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597039?source=rss",
      "publishedAt": "2026-09-30T02:29:33.000Z",
      "xQuery": "アパートで20代女性死亡 男を確保"
    },
    {
      "time": "11:23",
      "title": "西武渋谷店きょう閉店 開店前に列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597037?source=rss",
      "publishedAt": "2026-09-30T02:23:26.000Z",
      "xQuery": "西武渋谷店きょう閉店 開店前に列"
    },
    {
      "time": "12:53",
      "title": "アジア大会でトラブル 市長が謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597052?source=rss",
      "publishedAt": "2026-09-30T03:53:09.000Z",
      "xQuery": "アジア大会でトラブル 市長が謝罪"
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
