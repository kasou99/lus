window.LUS_X_NEWS = {
  "updatedAt": "2026-07-24T06:01:24.003Z",
  "items": [
    {
      "time": "14:15",
      "title": "4日連続で酷暑日 過去最長と並ぶ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589143?source=rss",
      "publishedAt": "2026-07-24T05:15:26.000Z",
      "xQuery": "4日連続で酷暑日 過去最長と並ぶ"
    },
    {
      "time": "13:36",
      "title": "トランプ政権の新関税が発動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589139?source=rss",
      "publishedAt": "2026-07-24T04:36:20.000Z",
      "xQuery": "トランプ政権の新関税が発動"
    },
    {
      "time": "13:46",
      "title": "副議長辞職 告発の県議を告訴方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589142?source=rss",
      "publishedAt": "2026-07-24T04:46:06.000Z",
      "xQuery": "副議長辞職 告発の県議を告訴方針"
    },
    {
      "time": "12:28",
      "title": "現職市長が産休 市政はチーム運営",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589132?source=rss",
      "publishedAt": "2026-07-24T03:28:50.000Z",
      "xQuery": "現職市長が産休 市政はチーム運営"
    },
    {
      "time": "14:41",
      "title": "あふれる名言フェイク動画 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589130?source=rss",
      "publishedAt": "2026-07-24T05:41:23.000Z",
      "xQuery": "あふれる名言フェイク動画 背景は"
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
