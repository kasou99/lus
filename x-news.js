window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T02:24:59.775Z",
  "items": [
    {
      "time": "09:29",
      "title": "台風接近 関東で危険警報相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582746?source=rss",
      "publishedAt": "2026-06-03T00:29:24.000Z",
      "xQuery": "台風接近 関東で危険警報相次ぐ"
    },
    {
      "time": "08:53",
      "title": "3.1兆円補正予算案を閣議決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582742?source=rss",
      "publishedAt": "2026-06-02T23:53:09.000Z",
      "xQuery": "3.1兆円補正予算案を閣議決定"
    },
    {
      "time": "10:00",
      "title": "日経平均株価 初の6万8000円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582750?source=rss",
      "publishedAt": "2026-06-03T01:00:45.000Z",
      "xQuery": "日経平均株価 初の6万8000円台"
    },
    {
      "time": "10:14",
      "title": "KIOXIA 時価総額が一時トヨタ超え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582751?source=rss",
      "publishedAt": "2026-06-03T01:14:07.000Z",
      "xQuery": "KIOXIA 時価総額が一時トヨタ超え"
    },
    {
      "time": "11:15",
      "title": "江別暴行死 強盗致死罪成立の判断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582756?source=rss",
      "publishedAt": "2026-06-03T02:15:58.000Z",
      "xQuery": "江別暴行死 強盗致死罪成立の判断"
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
