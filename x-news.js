window.LUS_X_NEWS = {
  "updatedAt": "2026-07-30T22:28:28.707Z",
  "items": [
    {
      "time": "06:23",
      "title": "熊本地震 迫る「72時間」捜索懸命",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589966?source=rss",
      "publishedAt": "2026-07-30T21:23:36.000Z",
      "xQuery": "熊本地震 迫る「72時間」捜索懸命"
    },
    {
      "time": "06:39",
      "title": "多くの被災者が車中泊 専門家警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589967?source=rss",
      "publishedAt": "2026-07-30T21:39:41.000Z",
      "xQuery": "多くの被災者が車中泊 専門家警鐘"
    },
    {
      "time": "22:33",
      "title": "首相 8月3日にも熊本入りで調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589958?source=rss",
      "publishedAt": "2026-07-30T13:33:44.000Z",
      "xQuery": "首相 8月3日にも熊本入りで調整"
    },
    {
      "time": "23:33",
      "title": "一時1ドル157円台 為替介入か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589962?source=rss",
      "publishedAt": "2026-07-30T14:33:10.000Z",
      "xQuery": "一時1ドル157円台 為替介入か"
    },
    {
      "time": "07:14",
      "title": "Apple純利益が27%増 iPhone好調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589968?source=rss",
      "publishedAt": "2026-07-30T22:14:44.000Z",
      "xQuery": "Apple純利益が27%増 iPhone好調"
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
