window.LUS_X_NEWS = {
  "updatedAt": "2026-08-27T13:34:59.591Z",
  "items": [
    {
      "time": "20:30",
      "title": "28日は広い範囲で大雨予想 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593325?source=rss",
      "publishedAt": "2026-08-27T11:30:51.000Z",
      "xQuery": "28日は広い範囲で大雨予想 警戒を"
    },
    {
      "time": "19:36",
      "title": "続く豪雨 温暖化影響と専門家指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593321?source=rss",
      "publishedAt": "2026-08-27T10:36:15.000Z",
      "xQuery": "続く豪雨 温暖化影響と専門家指摘"
    },
    {
      "time": "21:40",
      "title": "車水没 ドア蹴り脱出「死ぬかと」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593333?source=rss",
      "publishedAt": "2026-08-27T12:40:24.000Z",
      "xQuery": "車水没 ドア蹴り脱出「死ぬかと」"
    },
    {
      "time": "20:14",
      "title": "ネパールの土石流 不明1000人以上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593324?source=rss",
      "publishedAt": "2026-08-27T11:14:45.000Z",
      "xQuery": "ネパールの土石流 不明1000人以上"
    },
    {
      "time": "20:42",
      "title": "横浜市長 28日に進退表明へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593328?source=rss",
      "publishedAt": "2026-08-27T11:42:29.000Z",
      "xQuery": "横浜市長 28日に進退表明へ"
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
