window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T12:25:04.349Z",
  "items": [
    {
      "time": "18:37",
      "title": "物価上昇2%到達判断の公算大 日銀",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599845?source=rss",
      "publishedAt": "2026-10-23T09:37:44.000Z",
      "xQuery": "物価上昇2%到達判断の公算大 日銀"
    },
    {
      "time": "19:17",
      "title": "高峰登山で不明2邦人か 遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599853?source=rss",
      "publishedAt": "2026-10-23T10:17:11.000Z",
      "xQuery": "高峰登山で不明2邦人か 遺体発見"
    },
    {
      "time": "19:29",
      "title": "生徒が「指導死」教諭を懲戒免職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599854?source=rss",
      "publishedAt": "2026-10-23T10:29:10.000Z",
      "xQuery": "生徒が「指導死」教諭を懲戒免職"
    },
    {
      "time": "20:40",
      "title": "迷惑行為「ショウリンジ」相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599857?source=rss",
      "publishedAt": "2026-10-23T11:40:20.000Z",
      "xQuery": "迷惑行為「ショウリンジ」相次ぐ"
    },
    {
      "time": "18:15",
      "title": "Airbnb「過度な家事要求」禁止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599839?source=rss",
      "publishedAt": "2026-10-23T09:15:45.000Z",
      "xQuery": "Airbnb「過度な家事要求」禁止へ"
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
