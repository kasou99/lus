window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T07:42:10.176Z",
  "items": [
    {
      "time": "15:12",
      "title": "マット死事件 遺族訴え認める判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588034?source=rss",
      "publishedAt": "2026-07-15T06:12:23.000Z",
      "xQuery": "マット死事件 遺族訴え認める判決"
    },
    {
      "time": "15:02",
      "title": "子育て世帯 子1人が初の5割超え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588032?source=rss",
      "publishedAt": "2026-07-15T06:02:10.000Z",
      "xQuery": "子育て世帯 子1人が初の5割超え"
    },
    {
      "time": "15:39",
      "title": "高田馬場刺殺 懲役16年の実刑判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588035?source=rss",
      "publishedAt": "2026-07-15T06:39:30.000Z",
      "xQuery": "高田馬場刺殺 懲役16年の実刑判決"
    },
    {
      "time": "14:25",
      "title": "6歳死亡 集団登校中にはねられる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588031?source=rss",
      "publishedAt": "2026-07-15T05:25:58.000Z",
      "xQuery": "6歳死亡 集団登校中にはねられる"
    },
    {
      "time": "13:59",
      "title": "パワハラ問題 福澤監督の法的責任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588026?source=rss",
      "publishedAt": "2026-07-15T04:59:47.000Z",
      "xQuery": "パワハラ問題 福澤監督の法的責任"
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
