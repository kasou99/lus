window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T13:36:42.051Z",
  "items": [
    {
      "time": "19:43",
      "title": "台風 21日～22日に関東など接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595834?source=rss",
      "publishedAt": "2026-09-19T10:43:12.000Z",
      "xQuery": "台風 21日～22日に関東など接近"
    },
    {
      "time": "18:31",
      "title": "コメ価格が急落 生産者に危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595828?source=rss",
      "publishedAt": "2026-09-19T09:31:50.000Z",
      "xQuery": "コメ価格が急落 生産者に危機感"
    },
    {
      "time": "20:52",
      "title": "「人工視細胞」を開発 遺伝研など",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595841?source=rss",
      "publishedAt": "2026-09-19T11:52:44.000Z",
      "xQuery": "「人工視細胞」を開発 遺伝研など"
    },
    {
      "time": "20:32",
      "title": "作業員4人死亡 複数のミス連鎖か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595837?source=rss",
      "publishedAt": "2026-09-19T11:32:38.000Z",
      "xQuery": "作業員4人死亡 複数のミス連鎖か"
    },
    {
      "time": "21:52",
      "title": "10代巡査が拳銃自殺図ったか 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595846?source=rss",
      "publishedAt": "2026-09-19T12:52:03.000Z",
      "xQuery": "10代巡査が拳銃自殺図ったか 重体"
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
