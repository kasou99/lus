window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T04:41:31.912Z",
  "items": [
    {
      "time": "10:52",
      "title": "飛鳥・藤原の宮都 世界遺産に決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589354?source=rss",
      "publishedAt": "2026-07-26T01:52:06.000Z",
      "xQuery": "飛鳥・藤原の宮都 世界遺産に決定"
    },
    {
      "time": "09:59",
      "title": "東北と北陸 梅雨末期の大雨に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589349?source=rss",
      "publishedAt": "2026-07-26T00:59:37.000Z",
      "xQuery": "東北と北陸 梅雨末期の大雨に注意"
    },
    {
      "time": "12:53",
      "title": "首相の集中審議出席 大幅に減少",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589365?source=rss",
      "publishedAt": "2026-07-26T03:53:49.000Z",
      "xQuery": "首相の集中審議出席 大幅に減少"
    },
    {
      "time": "10:21",
      "title": "江別暴行死 殺人になると母に連絡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589350?source=rss",
      "publishedAt": "2026-07-26T01:21:59.000Z",
      "xQuery": "江別暴行死 殺人になると母に連絡"
    },
    {
      "time": "12:25",
      "title": "農薬散布機が木に衝突 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589361?source=rss",
      "publishedAt": "2026-07-26T03:25:11.000Z",
      "xQuery": "農薬散布機が木に衝突 男性死亡"
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
