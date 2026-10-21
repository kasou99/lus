window.LUS_X_NEWS = {
  "updatedAt": "2026-10-21T15:17:24.100Z",
  "items": [
    {
      "time": "21:10",
      "title": "秋田・子吉川に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599621?source=rss",
      "publishedAt": "2026-10-21T12:10:24.000Z",
      "xQuery": "秋田・子吉川に特別警報 最新情報"
    },
    {
      "time": "23:21",
      "title": "2年前水害の子吉川 住民不安な夜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599639?source=rss",
      "publishedAt": "2026-10-21T14:21:56.000Z",
      "xQuery": "2年前水害の子吉川 住民不安な夜"
    },
    {
      "time": "22:52",
      "title": "PHPに重大欠陥 Webの7割で使用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599637?source=rss",
      "publishedAt": "2026-10-21T13:52:02.000Z",
      "xQuery": "PHPに重大欠陥 Webの7割で使用"
    },
    {
      "time": "23:37",
      "title": "EVの補助金引き下げ 27年1月から",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599642?source=rss",
      "publishedAt": "2026-10-21T14:37:56.000Z",
      "xQuery": "EVの補助金引き下げ 27年1月から"
    },
    {
      "time": "22:13",
      "title": "床はう患者を職員が撮影 病院謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599631?source=rss",
      "publishedAt": "2026-10-21T13:13:19.000Z",
      "xQuery": "床はう患者を職員が撮影 病院謝罪"
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
