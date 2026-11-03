window.LUS_X_NEWS = {
  "updatedAt": "2026-11-03T02:15:34.409Z",
  "items": [
    {
      "time": "09:09",
      "title": "トランプ氏 演説で「口約束」連発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601130?source=rss",
      "publishedAt": "2026-11-03T00:09:15.000Z",
      "xQuery": "トランプ氏 演説で「口約束」連発"
    },
    {
      "time": "10:07",
      "title": "米・露・ウが10～11日に3者協議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601140?source=rss",
      "publishedAt": "2026-11-03T01:07:31.000Z",
      "xQuery": "米・露・ウが10～11日に3者協議"
    },
    {
      "time": "09:06",
      "title": "GMO 侵入から2カ月なぜ気付かず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601132?source=rss",
      "publishedAt": "2026-11-03T00:06:05.000Z",
      "xQuery": "GMO 侵入から2カ月なぜ気付かず"
    },
    {
      "time": "10:46",
      "title": "反対車線はみ出し車衝突 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601144?source=rss",
      "publishedAt": "2026-11-03T01:46:35.000Z",
      "xQuery": "反対車線はみ出し車衝突 1人死亡"
    },
    {
      "time": "10:44",
      "title": "親と縁切る「家族じまい」相談増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601143?source=rss",
      "publishedAt": "2026-11-03T01:44:22.000Z",
      "xQuery": "親と縁切る「家族じまい」相談増"
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
