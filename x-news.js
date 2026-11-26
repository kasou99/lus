window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T05:11:43.350Z",
  "items": [
    {
      "time": "13:36",
      "title": "山上被告側の控訴審主張 注目点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604054?source=rss",
      "publishedAt": "2026-11-26T04:36:20.000Z",
      "xQuery": "山上被告側の控訴審主張 注目点は"
    },
    {
      "time": "11:40",
      "title": "ファクトチェック組織 誤情報掲載",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604032?source=rss",
      "publishedAt": "2026-11-26T02:40:18.000Z",
      "xQuery": "ファクトチェック組織 誤情報掲載"
    },
    {
      "time": "13:57",
      "title": "中部電 不正関わった関係者処分へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604056?source=rss",
      "publishedAt": "2026-11-26T04:57:37.000Z",
      "xQuery": "中部電 不正関わった関係者処分へ"
    },
    {
      "time": "13:06",
      "title": "兵庫の3歳女児死亡 臓器に萎縮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604051?source=rss",
      "publishedAt": "2026-11-26T04:06:08.000Z",
      "xQuery": "兵庫の3歳女児死亡 臓器に萎縮"
    },
    {
      "time": "12:45",
      "title": "神戸6歳死亡に「涙流した」と被告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604048?source=rss",
      "publishedAt": "2026-11-26T03:45:30.000Z",
      "xQuery": "神戸6歳死亡に「涙流した」と被告"
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
