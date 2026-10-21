window.LUS_X_NEWS = {
  "updatedAt": "2026-10-21T22:15:29.384Z",
  "items": [
    {
      "time": "02:38",
      "title": "秋田・子吉川 氾濫注意報に切替",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599644?source=rss",
      "publishedAt": "2026-10-21T17:38:29.000Z",
      "xQuery": "秋田・子吉川 氾濫注意報に切替"
    },
    {
      "time": "02:42",
      "title": "自民 衆院定数の削減幅を31で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599633?source=rss",
      "publishedAt": "2026-10-21T17:42:41.000Z",
      "xQuery": "自民 衆院定数の削減幅を31で調整"
    },
    {
      "time": "22:52",
      "title": "PHPに重大欠陥 Webの7割で使用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599637?source=rss",
      "publishedAt": "2026-10-21T13:52:02.000Z",
      "xQuery": "PHPに重大欠陥 Webの7割で使用"
    },
    {
      "time": "06:57",
      "title": "PHPに欠陥 欧州各国でサイト遮断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599650?source=rss",
      "publishedAt": "2026-10-21T21:57:25.000Z",
      "xQuery": "PHPに欠陥 欧州各国でサイト遮断"
    },
    {
      "time": "06:22",
      "title": "コミックシーモア最大420万件流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599646?source=rss",
      "publishedAt": "2026-10-21T21:22:20.000Z",
      "xQuery": "コミックシーモア最大420万件流出"
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
