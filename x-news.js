window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T06:46:46.554Z",
  "items": [
    {
      "time": "15:27",
      "title": "中継 GMO熊谷社長らが記者会見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601060?source=rss",
      "publishedAt": "2026-11-02T06:27:57.000Z",
      "xQuery": "中継 GMO熊谷社長らが記者会見"
    },
    {
      "time": "15:20",
      "title": "露首都テロ計画巡り 少年1人拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601061?source=rss",
      "publishedAt": "2026-11-02T06:20:07.000Z",
      "xQuery": "露首都テロ計画巡り 少年1人拘束"
    },
    {
      "time": "13:32",
      "title": "文科相 東大学長の選考理由不明確",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601053?source=rss",
      "publishedAt": "2026-11-02T04:32:41.000Z",
      "xQuery": "文科相 東大学長の選考理由不明確"
    },
    {
      "time": "13:54",
      "title": "「アララ」7700万件のメアド流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601057?source=rss",
      "publishedAt": "2026-11-02T04:54:46.000Z",
      "xQuery": "「アララ」7700万件のメアド流出"
    },
    {
      "time": "14:25",
      "title": "盗難の高級腕時計戻る わび状同封",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601058?source=rss",
      "publishedAt": "2026-11-02T05:25:12.000Z",
      "xQuery": "盗難の高級腕時計戻る わび状同封"
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
