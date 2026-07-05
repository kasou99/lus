window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T22:51:33.615Z",
  "items": [
    {
      "time": "07:21",
      "title": "九州～東海 激しい雨や落雷に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586877?source=rss",
      "publishedAt": "2026-07-05T22:21:12.000Z",
      "xQuery": "九州～東海 激しい雨や落雷に注意"
    },
    {
      "time": "07:27",
      "title": "防衛省に新たな局を増設へ調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586878?source=rss",
      "publishedAt": "2026-07-05T22:27:14.000Z",
      "xQuery": "防衛省に新たな局を増設へ調整"
    },
    {
      "time": "21:54",
      "title": "スイミング大会中に溺れ 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586857?source=rss",
      "publishedAt": "2026-07-05T12:54:54.000Z",
      "xQuery": "スイミング大会中に溺れ 男性死亡"
    },
    {
      "time": "23:36",
      "title": "警察学校生が容疑者を追う 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586869?source=rss",
      "publishedAt": "2026-07-05T14:36:09.000Z",
      "xQuery": "警察学校生が容疑者を追う 男逮捕"
    },
    {
      "time": "06:41",
      "title": "路上喫煙の過料「2万円」市の狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586874?source=rss",
      "publishedAt": "2026-07-05T21:41:51.000Z",
      "xQuery": "路上喫煙の過料「2万円」市の狙い"
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
