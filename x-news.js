window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T02:48:08.542Z",
  "items": [
    {
      "time": "11:39",
      "title": "高市首相 沖縄新知事と「連携」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595234?source=rss",
      "publishedAt": "2026-09-14T02:39:36.000Z",
      "xQuery": "高市首相 沖縄新知事と「連携」"
    },
    {
      "time": "08:17",
      "title": "日本海側 激しい雨や落雷に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595217?source=rss",
      "publishedAt": "2026-09-13T23:17:43.000Z",
      "xQuery": "日本海側 激しい雨や落雷に注意"
    },
    {
      "time": "11:15",
      "title": "ネイリスト殺害 起訴内容を認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595230?source=rss",
      "publishedAt": "2026-09-14T02:15:15.000Z",
      "xQuery": "ネイリスト殺害 起訴内容を認める"
    },
    {
      "time": "10:20",
      "title": "工場でガス爆発か 従業員3人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595228?source=rss",
      "publishedAt": "2026-09-14T01:20:11.000Z",
      "xQuery": "工場でガス爆発か 従業員3人けが"
    },
    {
      "time": "10:19",
      "title": "抗議の退社 AI開発に懸念相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595226?source=rss",
      "publishedAt": "2026-09-14T01:19:50.000Z",
      "xQuery": "抗議の退社 AI開発に懸念相次ぐ"
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
