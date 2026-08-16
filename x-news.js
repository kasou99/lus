window.LUS_X_NEWS = {
  "updatedAt": "2026-08-16T12:48:08.609Z",
  "items": [
    {
      "time": "20:11",
      "title": "内閣改造と自民役員人事 注目点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591986?source=rss",
      "publishedAt": "2026-08-16T11:11:22.000Z",
      "xQuery": "内閣改造と自民役員人事 注目点は"
    },
    {
      "time": "21:07",
      "title": "辞職勧告受け 福岡県議長続投考え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591987?source=rss",
      "publishedAt": "2026-08-16T12:07:39.000Z",
      "xQuery": "辞職勧告受け 福岡県議長続投考え"
    },
    {
      "time": "20:16",
      "title": "知人助けようとして行方不明 千葉",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591985?source=rss",
      "publishedAt": "2026-08-16T11:16:55.000Z",
      "xQuery": "知人助けようとして行方不明 千葉"
    },
    {
      "time": "19:26",
      "title": "早期退職 第二の人生は甘くない?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591977?source=rss",
      "publishedAt": "2026-08-16T10:26:05.000Z",
      "xQuery": "早期退職 第二の人生は甘くない?"
    },
    {
      "time": "21:38",
      "title": "京急上大岡駅 液晶の「パタパタ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591992?source=rss",
      "publishedAt": "2026-08-16T12:38:32.000Z",
      "xQuery": "京急上大岡駅 液晶の「パタパタ」"
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
