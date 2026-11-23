window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T02:37:50.991Z",
  "items": [
    {
      "time": "09:34",
      "title": "野党 文科相の「問責」提出の構え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603638?source=rss",
      "publishedAt": "2026-11-23T00:34:04.000Z",
      "xQuery": "野党 文科相の「問責」提出の構え"
    },
    {
      "time": "10:03",
      "title": "首里城正殿の復元 県知事「万感」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603641?source=rss",
      "publishedAt": "2026-11-23T01:03:54.000Z",
      "xQuery": "首里城正殿の復元 県知事「万感」"
    },
    {
      "time": "11:04",
      "title": "トランプ氏 イラン再攻撃に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603648?source=rss",
      "publishedAt": "2026-11-23T02:04:58.000Z",
      "xQuery": "トランプ氏 イラン再攻撃に言及"
    },
    {
      "time": "09:08",
      "title": "死亡事故受け 柏崎刈羽で工事中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603635?source=rss",
      "publishedAt": "2026-11-23T00:08:57.000Z",
      "xQuery": "死亡事故受け 柏崎刈羽で工事中止"
    },
    {
      "time": "09:20",
      "title": "「ほぼ日手帳」海外で人気のワケ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603636?source=rss",
      "publishedAt": "2026-11-23T00:20:14.000Z",
      "xQuery": "「ほぼ日手帳」海外で人気のワケ"
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
