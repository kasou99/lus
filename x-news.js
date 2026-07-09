window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T09:14:44.102Z",
  "items": [
    {
      "time": "17:17",
      "title": "台風が11日にも沖縄に最接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587315?source=rss",
      "publishedAt": "2026-07-09T08:17:51.000Z",
      "xQuery": "台風が11日にも沖縄に最接近 警戒"
    },
    {
      "time": "17:12",
      "title": "タダノに下請法違反で勧告 公取委",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587314?source=rss",
      "publishedAt": "2026-07-09T08:12:20.000Z",
      "xQuery": "タダノに下請法違反で勧告 公取委"
    },
    {
      "time": "18:01",
      "title": "集団暴行死 川村葉音被告も控訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587326?source=rss",
      "publishedAt": "2026-07-09T09:01:47.000Z",
      "xQuery": "集団暴行死 川村葉音被告も控訴"
    },
    {
      "time": "17:46",
      "title": "川で高校生2人が行方不明 滋賀",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587323?source=rss",
      "publishedAt": "2026-07-09T08:46:45.000Z",
      "xQuery": "川で高校生2人が行方不明 滋賀"
    },
    {
      "time": "17:32",
      "title": "長引くせき・たん 理解されず退職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587319?source=rss",
      "publishedAt": "2026-07-09T08:32:19.000Z",
      "xQuery": "長引くせき・たん 理解されず退職"
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
