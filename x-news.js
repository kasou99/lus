window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T22:32:43.301Z",
  "items": [
    {
      "time": "06:52",
      "title": "米イラン 戦闘終結に「合意」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584269?source=rss",
      "publishedAt": "2026-06-14T21:52:09.000Z",
      "xQuery": "米イラン 戦闘終結に「合意」"
    },
    {
      "time": "23:16",
      "title": "中国とモンゴル 軍国主義を非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584261?source=rss",
      "publishedAt": "2026-06-14T14:16:51.000Z",
      "xQuery": "中国とモンゴル 軍国主義を非難"
    },
    {
      "time": "22:27",
      "title": "英 露「影の船団」タンカーを拿捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584253?source=rss",
      "publishedAt": "2026-06-14T13:27:20.000Z",
      "xQuery": "英 露「影の船団」タンカーを拿捕"
    },
    {
      "time": "23:36",
      "title": "車と別の車のドアに挟まれる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584262?source=rss",
      "publishedAt": "2026-06-14T14:36:21.000Z",
      "xQuery": "車と別の車のドアに挟まれる 死亡"
    },
    {
      "time": "18:04",
      "title": "増える「ホビ垢」女子 実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584224?source=rss",
      "publishedAt": "2026-06-14T09:04:25.000Z",
      "xQuery": "増える「ホビ垢」女子 実態は"
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
