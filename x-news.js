window.LUS_X_NEWS = {
  "updatedAt": "2026-11-09T22:09:16.072Z",
  "items": [
    {
      "time": "06:48",
      "title": "石破前首相ら戒告処分 参院側不満",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601976?source=rss",
      "publishedAt": "2026-11-09T21:48:49.000Z",
      "xQuery": "石破前首相ら戒告処分 参院側不満"
    },
    {
      "time": "21:43",
      "title": "「低体温症」8割近くが屋内で発症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601956?source=rss",
      "publishedAt": "2026-11-09T12:43:25.000Z",
      "xQuery": "「低体温症」8割近くが屋内で発症"
    },
    {
      "time": "22:37",
      "title": "大地震エネルギー蓄積か 日本海溝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601961?source=rss",
      "publishedAt": "2026-11-09T13:37:17.000Z",
      "xQuery": "大地震エネルギー蓄積か 日本海溝"
    },
    {
      "time": "23:30",
      "title": "映像 270kgの巨大ヒグマを捕獲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601968?source=rss",
      "publishedAt": "2026-11-09T14:30:57.000Z",
      "xQuery": "映像 270kgの巨大ヒグマを捕獲"
    },
    {
      "time": "00:44",
      "title": "自動運転バス運行初日に接触 運休",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601972?source=rss",
      "publishedAt": "2026-11-09T15:44:51.000Z",
      "xQuery": "自動運転バス運行初日に接触 運休"
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
