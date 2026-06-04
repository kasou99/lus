window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T08:49:54.128Z",
  "items": [
    {
      "time": "15:43",
      "title": "衆院定数は比例45削減 首相指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582921?source=rss",
      "publishedAt": "2026-06-04T06:43:19.000Z",
      "xQuery": "衆院定数は比例45削減 首相指示"
    },
    {
      "time": "16:55",
      "title": "天安門事件 検閲で過去消せずと米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582932?source=rss",
      "publishedAt": "2026-06-04T07:55:05.000Z",
      "xQuery": "天安門事件 検閲で過去消せずと米"
    },
    {
      "time": "15:41",
      "title": "内田梨瑚被告 涙流し傍聴席に一礼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582920?source=rss",
      "publishedAt": "2026-06-04T06:41:14.000Z",
      "xQuery": "内田梨瑚被告 涙流し傍聴席に一礼"
    },
    {
      "time": "17:18",
      "title": "田久保前市長を追送検 捜査終結",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582934?source=rss",
      "publishedAt": "2026-06-04T08:18:25.000Z",
      "xQuery": "田久保前市長を追送検 捜査終結"
    },
    {
      "time": "17:46",
      "title": "パシフィコ横浜 大ホール休館へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582939?source=rss",
      "publishedAt": "2026-06-04T08:46:12.000Z",
      "xQuery": "パシフィコ横浜 大ホール休館へ"
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
