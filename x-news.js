window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T01:33:05.920Z",
  "items": [
    {
      "time": "08:43",
      "title": "日本軍の秘密作戦 石油部隊とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591772?source=rss",
      "publishedAt": "2026-08-14T23:43:49.000Z",
      "xQuery": "日本軍の秘密作戦 石油部隊とは"
    },
    {
      "time": "08:31",
      "title": "駅長かなわず戦死 父の無念思う娘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591771?source=rss",
      "publishedAt": "2026-08-14T23:31:53.000Z",
      "xQuery": "駅長かなわず戦死 父の無念思う娘"
    },
    {
      "time": "09:08",
      "title": "自民幹部ら相次ぎ靖国神社を参拝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591779?source=rss",
      "publishedAt": "2026-08-15T00:08:58.000Z",
      "xQuery": "自民幹部ら相次ぎ靖国神社を参拝"
    },
    {
      "time": "08:16",
      "title": "車の中に人が 豪雨で一変した街",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591770?source=rss",
      "publishedAt": "2026-08-14T23:16:33.000Z",
      "xQuery": "車の中に人が 豪雨で一変した街"
    },
    {
      "time": "09:53",
      "title": "インドネシアM7.7現地は津波警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591784?source=rss",
      "publishedAt": "2026-08-15T00:53:59.000Z",
      "xQuery": "インドネシアM7.7現地は津波警戒"
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
