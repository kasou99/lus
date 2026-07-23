window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T10:19:34.742Z",
  "items": [
    {
      "time": "17:46",
      "title": "陸自情報部隊が「愛国心」調査か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589038?source=rss",
      "publishedAt": "2026-07-23T08:46:28.000Z",
      "xQuery": "陸自情報部隊が「愛国心」調査か"
    },
    {
      "time": "18:54",
      "title": "フーシ派 サウジのタンカーを攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589055?source=rss",
      "publishedAt": "2026-07-23T09:54:33.000Z",
      "xQuery": "フーシ派 サウジのタンカーを攻撃"
    },
    {
      "time": "18:33",
      "title": "寝てください 首相に自民幹部進言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589051?source=rss",
      "publishedAt": "2026-07-23T09:33:22.000Z",
      "xQuery": "寝てください 首相に自民幹部進言"
    },
    {
      "time": "17:23",
      "title": "遺体発見 JFE事故の作業員と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589036?source=rss",
      "publishedAt": "2026-07-23T08:23:25.000Z",
      "xQuery": "遺体発見 JFE事故の作業員と判明"
    },
    {
      "time": "19:10",
      "title": "ため池2人死亡 熱中症の可能性も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589056?source=rss",
      "publishedAt": "2026-07-23T10:10:19.000Z",
      "xQuery": "ため池2人死亡 熱中症の可能性も"
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
