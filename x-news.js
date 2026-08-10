window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T02:52:30.432Z",
  "items": [
    {
      "time": "09:13",
      "title": "便乗犯罪 熊本の被災者に追い打ち",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591156?source=rss",
      "publishedAt": "2026-08-10T00:13:40.000Z",
      "xQuery": "便乗犯罪 熊本の被災者に追い打ち"
    },
    {
      "time": "10:44",
      "title": "高速のバイク事故 時間や区間分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591164?source=rss",
      "publishedAt": "2026-08-10T01:44:34.000Z",
      "xQuery": "高速のバイク事故 時間や区間分析"
    },
    {
      "time": "11:18",
      "title": "検事から「反社」 法廷で映像再生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591168?source=rss",
      "publishedAt": "2026-08-10T02:18:04.000Z",
      "xQuery": "検事から「反社」 法廷で映像再生"
    },
    {
      "time": "11:42",
      "title": "沢登り中の女性 流され行方不明に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591172?source=rss",
      "publishedAt": "2026-08-10T02:42:17.000Z",
      "xQuery": "沢登り中の女性 流され行方不明に"
    },
    {
      "time": "11:38",
      "title": "世帯年収1000万円 理想とは遠い家",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591171?source=rss",
      "publishedAt": "2026-08-10T02:38:20.000Z",
      "xQuery": "世帯年収1000万円 理想とは遠い家"
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
