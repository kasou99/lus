window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T00:58:44.200Z",
  "items": [
    {
      "time": "08:45",
      "title": "米独立記念日 首都ではデモ行進",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586766?source=rss",
      "publishedAt": "2026-07-04T23:45:59.000Z",
      "xQuery": "米独立記念日 首都ではデモ行進"
    },
    {
      "time": "08:33",
      "title": "障害者事業所への運営指導 低迷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586765?source=rss",
      "publishedAt": "2026-07-04T23:33:16.000Z",
      "xQuery": "障害者事業所への運営指導 低迷"
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
      "time": "09:44",
      "title": "工場にオオサンショウウオ 騒然",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586775?source=rss",
      "publishedAt": "2026-07-05T00:44:58.000Z",
      "xQuery": "工場にオオサンショウウオ 騒然"
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
