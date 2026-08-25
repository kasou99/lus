window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T01:33:14.533Z",
  "items": [
    {
      "time": "09:08",
      "title": "米 イランに「経済的総攻撃」発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592970?source=rss",
      "publishedAt": "2026-08-25T00:08:24.000Z",
      "xQuery": "米 イランに「経済的総攻撃」発表"
    },
    {
      "time": "10:07",
      "title": "イオン爆発前に「ガス臭」証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592976?source=rss",
      "publishedAt": "2026-08-25T01:07:16.000Z",
      "xQuery": "イオン爆発前に「ガス臭」証言"
    },
    {
      "time": "09:21",
      "title": "路上売春 買う側処罰案に賛否の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592971?source=rss",
      "publishedAt": "2026-08-25T00:21:33.000Z",
      "xQuery": "路上売春 買う側処罰案に賛否の訳"
    },
    {
      "time": "09:25",
      "title": "「将門塚」で迷惑配信 刑事責任は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592972?source=rss",
      "publishedAt": "2026-08-25T00:25:48.000Z",
      "xQuery": "「将門塚」で迷惑配信 刑事責任は"
    },
    {
      "time": "10:17",
      "title": "窓口営業は午前のみ 京都信用金庫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592978?source=rss",
      "publishedAt": "2026-08-25T01:17:36.000Z",
      "xQuery": "窓口営業は午前のみ 京都信用金庫"
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
