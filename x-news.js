window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T11:13:28.636Z",
  "items": [
    {
      "time": "20:11",
      "title": "中田ボタンさん死去 肺がんで闘病",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595838?source=rss",
      "publishedAt": "2026-09-19T11:11:06.000Z",
      "xQuery": "中田ボタンさん死去 肺がんで闘病"
    },
    {
      "time": "17:29",
      "title": "外務省テロ訓練 衣装への批判続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595821?source=rss",
      "publishedAt": "2026-09-19T08:29:17.000Z",
      "xQuery": "外務省テロ訓練 衣装への批判続く"
    },
    {
      "time": "16:40",
      "title": "Anthropic アクセンチュアと提携",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595818?source=rss",
      "publishedAt": "2026-09-19T07:40:31.000Z",
      "xQuery": "Anthropic アクセンチュアと提携"
    },
    {
      "time": "17:45",
      "title": "連休のイベント中止続出 台風影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595824?source=rss",
      "publishedAt": "2026-09-19T08:45:28.000Z",
      "xQuery": "連休のイベント中止続出 台風影響"
    },
    {
      "time": "17:11",
      "title": "衰弱死の16歳少女 訴え続けた無実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595817?source=rss",
      "publishedAt": "2026-09-19T08:11:13.000Z",
      "xQuery": "衰弱死の16歳少女 訴え続けた無実"
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
