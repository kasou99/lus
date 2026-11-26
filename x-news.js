window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T04:13:43.995Z",
  "items": [
    {
      "time": "11:53",
      "title": "問責案受け 文科相「説明尽くす」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604038?source=rss",
      "publishedAt": "2026-11-26T02:53:54.000Z",
      "xQuery": "問責案受け 文科相「説明尽くす」"
    },
    {
      "time": "12:16",
      "title": "大阪都構想の協定書案 正式に決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604042?source=rss",
      "publishedAt": "2026-11-26T03:16:44.000Z",
      "xQuery": "大阪都構想の協定書案 正式に決定"
    },
    {
      "time": "12:45",
      "title": "神戸6歳死亡に「涙流した」と被告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604048?source=rss",
      "publishedAt": "2026-11-26T03:45:30.000Z",
      "xQuery": "神戸6歳死亡に「涙流した」と被告"
    },
    {
      "time": "11:26",
      "title": "若者が注目「フリース」再ブーム",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604026?source=rss",
      "publishedAt": "2026-11-26T02:26:05.000Z",
      "xQuery": "若者が注目「フリース」再ブーム"
    },
    {
      "time": "10:44",
      "title": "料理家・辰巳芳子さん死去 101歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604025?source=rss",
      "publishedAt": "2026-11-26T01:44:40.000Z",
      "xQuery": "料理家・辰巳芳子さん死去 101歳"
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
