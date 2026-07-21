window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T06:02:56.719Z",
  "items": [
    {
      "time": "14:22",
      "title": "岐阜県郡上市で「酷暑日」全国初",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588752?source=rss",
      "publishedAt": "2026-07-21T05:22:41.000Z",
      "xQuery": "岐阜県郡上市で「酷暑日」全国初"
    },
    {
      "time": "14:00",
      "title": "企業統治指針 5年ぶりに改訂",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588749?source=rss",
      "publishedAt": "2026-07-21T05:00:19.000Z",
      "xQuery": "企業統治指針 5年ぶりに改訂"
    },
    {
      "time": "12:00",
      "title": "北陸新幹線桂川ルート 抱える難題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588731?source=rss",
      "publishedAt": "2026-07-21T03:00:39.000Z",
      "xQuery": "北陸新幹線桂川ルート 抱える難題"
    },
    {
      "time": "14:52",
      "title": "関経連でハラスメント 処分を発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588755?source=rss",
      "publishedAt": "2026-07-21T05:52:09.000Z",
      "xQuery": "関経連でハラスメント 処分を発表"
    },
    {
      "time": "13:05",
      "title": "「着る虫よけ」人気 大手も参入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588744?source=rss",
      "publishedAt": "2026-07-21T04:05:16.000Z",
      "xQuery": "「着る虫よけ」人気 大手も参入"
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
