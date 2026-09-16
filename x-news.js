window.LUS_X_NEWS = {
  "updatedAt": "2026-09-16T11:38:38.718Z",
  "items": [
    {
      "time": "20:18",
      "title": "十勝岳の噴火可能性高まる 調査委",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595518?source=rss",
      "publishedAt": "2026-09-16T11:18:54.000Z",
      "xQuery": "十勝岳の噴火可能性高まる 調査委"
    },
    {
      "time": "18:11",
      "title": "エーザイ認知症薬承認 自ら注射可",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595508?source=rss",
      "publishedAt": "2026-09-16T09:11:18.000Z",
      "xQuery": "エーザイ認知症薬承認 自ら注射可"
    },
    {
      "time": "18:33",
      "title": "辺野古転覆 運航団体が謝罪声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595510?source=rss",
      "publishedAt": "2026-09-16T09:33:17.000Z",
      "xQuery": "辺野古転覆 運航団体が謝罪声明"
    },
    {
      "time": "18:25",
      "title": "10年前に性的暴行疑い 容疑者逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595509?source=rss",
      "publishedAt": "2026-09-16T09:25:26.000Z",
      "xQuery": "10年前に性的暴行疑い 容疑者逮捕"
    },
    {
      "time": "17:21",
      "title": "幼稚園が閉園を突然発表 困惑の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595504?source=rss",
      "publishedAt": "2026-09-16T08:21:10.000Z",
      "xQuery": "幼稚園が閉園を突然発表 困惑の声"
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
