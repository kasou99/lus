window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T01:39:15.737Z",
  "items": [
    {
      "time": "10:10",
      "title": "官邸と自民 国会対応でぎくしゃく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587993?source=rss",
      "publishedAt": "2026-07-15T01:10:45.000Z",
      "xQuery": "官邸と自民 国会対応でぎくしゃく"
    },
    {
      "time": "08:37",
      "title": "北陸新幹線延伸「桂川」案に決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587983?source=rss",
      "publishedAt": "2026-07-14T23:37:27.000Z",
      "xQuery": "北陸新幹線延伸「桂川」案に決定"
    },
    {
      "time": "09:40",
      "title": "FRB議長「インフレ容認しない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587990?source=rss",
      "publishedAt": "2026-07-15T00:40:22.000Z",
      "xQuery": "FRB議長「インフレ容認しない」"
    },
    {
      "time": "09:10",
      "title": "寄生虫感染症が拡大 米で1600人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587984?source=rss",
      "publishedAt": "2026-07-15T00:10:57.000Z",
      "xQuery": "寄生虫感染症が拡大 米で1600人超"
    },
    {
      "time": "10:14",
      "title": "鉄製カゴとローラーに挟まる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587994?source=rss",
      "publishedAt": "2026-07-15T01:14:56.000Z",
      "xQuery": "鉄製カゴとローラーに挟まる 死亡"
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
