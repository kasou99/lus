window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T03:49:11.920Z",
  "items": [
    {
      "time": "12:28",
      "title": "詐欺被害金の追跡 警察と銀行協定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582001?source=rss",
      "publishedAt": "2026-05-28T03:28:57.000Z",
      "xQuery": "詐欺被害金の追跡 警察と銀行協定"
    },
    {
      "time": "08:03",
      "title": "物流業界 輸送力確保は外国人頼み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581976?source=rss",
      "publishedAt": "2026-05-27T23:03:26.000Z",
      "xQuery": "物流業界 輸送力確保は外国人頼み"
    },
    {
      "time": "12:08",
      "title": "京都男児遺体 殺人の罪で父親起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582004?source=rss",
      "publishedAt": "2026-05-28T03:08:26.000Z",
      "xQuery": "京都男児遺体 殺人の罪で父親起訴"
    },
    {
      "time": "11:26",
      "title": "乗務前の飲酒 なぜJALで表面化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581996?source=rss",
      "publishedAt": "2026-05-28T02:26:42.000Z",
      "xQuery": "乗務前の飲酒 なぜJALで表面化"
    },
    {
      "time": "11:51",
      "title": "サラ川 1位はスマホ決済の不安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582000?source=rss",
      "publishedAt": "2026-05-28T02:51:15.000Z",
      "xQuery": "サラ川 1位はスマホ決済の不安"
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
