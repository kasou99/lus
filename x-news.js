window.LUS_X_NEWS = {
  "updatedAt": "2026-07-30T09:22:43.185Z",
  "items": [
    {
      "time": "16:31",
      "title": "熊本地震の死者34人に 県発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589909?source=rss",
      "publishedAt": "2026-07-30T07:31:36.000Z",
      "xQuery": "熊本地震の死者34人に 県発表"
    },
    {
      "time": "17:50",
      "title": "熊本災害マップ 給水所や航空写真",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589920?source=rss",
      "publishedAt": "2026-07-30T08:50:39.000Z",
      "xQuery": "熊本災害マップ 給水所や航空写真"
    },
    {
      "time": "18:02",
      "title": "イオンモール爆発 死者は7人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589917?source=rss",
      "publishedAt": "2026-07-30T09:02:09.000Z",
      "xQuery": "イオンモール爆発 死者は7人に"
    },
    {
      "time": "17:49",
      "title": "ひろゆき氏と泉房穂氏 新党を設立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589923?source=rss",
      "publishedAt": "2026-07-30T08:49:47.000Z",
      "xQuery": "ひろゆき氏と泉房穂氏 新党を設立"
    },
    {
      "time": "17:51",
      "title": "パワハラ認定 横浜市長がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589924?source=rss",
      "publishedAt": "2026-07-30T08:51:59.000Z",
      "xQuery": "パワハラ認定 横浜市長がコメント"
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
