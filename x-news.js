window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T23:51:19.336Z",
  "items": [
    {
      "time": "07:37",
      "title": "九州北部で大雨 土砂災害など警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586756?source=rss",
      "publishedAt": "2026-07-04T22:37:03.000Z",
      "xQuery": "九州北部で大雨 土砂災害など警戒"
    },
    {
      "time": "07:58",
      "title": "露 ウ東部要衝への砲撃停止を提案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586760?source=rss",
      "publishedAt": "2026-07-04T22:58:25.000Z",
      "xQuery": "露 ウ東部要衝への砲撃停止を提案"
    },
    {
      "time": "08:12",
      "title": "ヒグマ目撃 山で4人一時立ち往生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586762?source=rss",
      "publishedAt": "2026-07-04T23:12:12.000Z",
      "xQuery": "ヒグマ目撃 山で4人一時立ち往生"
    },
    {
      "time": "07:33",
      "title": "2人乗りバイクから転落 女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586757?source=rss",
      "publishedAt": "2026-07-04T22:33:06.000Z",
      "xQuery": "2人乗りバイクから転落 女性死亡"
    },
    {
      "time": "08:22",
      "title": "NY早食い 須藤美貴さんが12回目V",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586763?source=rss",
      "publishedAt": "2026-07-04T23:22:12.000Z",
      "xQuery": "NY早食い 須藤美貴さんが12回目V"
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
