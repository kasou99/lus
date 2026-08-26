window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T18:00:18.503Z",
  "items": [
    {
      "time": "21:00",
      "title": "ICC制裁 日本を巡り前所長が指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593182?source=rss",
      "publishedAt": "2026-08-26T12:00:22.000Z",
      "xQuery": "ICC制裁 日本を巡り前所長が指摘"
    },
    {
      "time": "23:49",
      "title": "ネパール洪水 観光客約380人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593197?source=rss",
      "publishedAt": "2026-08-26T14:49:45.000Z",
      "xQuery": "ネパール洪水 観光客約380人不明"
    },
    {
      "time": "23:36",
      "title": "学校版カスハラ指針 国が策定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593196?source=rss",
      "publishedAt": "2026-08-26T14:36:02.000Z",
      "xQuery": "学校版カスハラ指針 国が策定へ"
    },
    {
      "time": "22:42",
      "title": "ヘンリー王子一家が帰国 英報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593191?source=rss",
      "publishedAt": "2026-08-26T13:42:37.000Z",
      "xQuery": "ヘンリー王子一家が帰国 英報道"
    },
    {
      "time": "22:23",
      "title": "生活道路の法定速度 9/1から30km",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593189?source=rss",
      "publishedAt": "2026-08-26T13:23:03.000Z",
      "xQuery": "生活道路の法定速度 9/1から30km"
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
