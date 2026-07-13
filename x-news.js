window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T23:49:46.591Z",
  "items": [
    {
      "time": "07:23",
      "title": "猛暑日100地点超えか 熱中症警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587842?source=rss",
      "publishedAt": "2026-07-13T22:23:08.000Z",
      "xQuery": "猛暑日100地点超えか 熱中症警戒"
    },
    {
      "time": "08:41",
      "title": "維新 入閣意向を高市首相に伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587853?source=rss",
      "publishedAt": "2026-07-13T23:41:12.000Z",
      "xQuery": "維新 入閣意向を高市首相に伝達"
    },
    {
      "time": "08:08",
      "title": "休職代行広がり 公務員ら駆け込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587847?source=rss",
      "publishedAt": "2026-07-13T23:08:01.000Z",
      "xQuery": "休職代行広がり 公務員ら駆け込み"
    },
    {
      "time": "07:29",
      "title": "「ローカル億ション」なぜ増える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587844?source=rss",
      "publishedAt": "2026-07-13T22:29:58.000Z",
      "xQuery": "「ローカル億ション」なぜ増える"
    },
    {
      "time": "08:15",
      "title": "「目立ちたい」令和の暴走族 実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587850?source=rss",
      "publishedAt": "2026-07-13T23:15:25.000Z",
      "xQuery": "「目立ちたい」令和の暴走族 実態"
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
