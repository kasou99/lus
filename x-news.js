window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T12:26:03.365Z",
  "items": [
    {
      "time": "20:58",
      "title": "首相 安倍氏の追悼集会で決意語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587593?source=rss",
      "publishedAt": "2026-07-11T11:58:14.000Z",
      "xQuery": "首相 安倍氏の追悼集会で決意語る"
    },
    {
      "time": "18:46",
      "title": "O157で級友犠牲 今は管理栄養士",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587584?source=rss",
      "publishedAt": "2026-07-11T09:46:07.000Z",
      "xQuery": "O157で級友犠牲 今は管理栄養士"
    },
    {
      "time": "20:30",
      "title": "米大統領 暗殺試みればイラン破壊",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587592?source=rss",
      "publishedAt": "2026-07-11T11:30:56.000Z",
      "xQuery": "米大統領 暗殺試みればイラン破壊"
    },
    {
      "time": "17:28",
      "title": "花火大会 警備費増で苦渋の判断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587573?source=rss",
      "publishedAt": "2026-07-11T08:28:18.000Z",
      "xQuery": "花火大会 警備費増で苦渋の判断"
    },
    {
      "time": "19:13",
      "title": "パンチ君の公立動物園 地道な工夫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587583?source=rss",
      "publishedAt": "2026-07-11T10:13:11.000Z",
      "xQuery": "パンチ君の公立動物園 地道な工夫"
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
