window.LUS_X_NEWS = {
  "updatedAt": "2026-07-22T10:20:03.191Z",
  "items": [
    {
      "time": "18:03",
      "title": "23日は関東内陸でも酷暑日か 危険",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588923?source=rss",
      "publishedAt": "2026-07-22T09:03:16.000Z",
      "xQuery": "23日は関東内陸でも酷暑日か 危険"
    },
    {
      "time": "18:05",
      "title": "公立教員 精神疾患理由の退職最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588920?source=rss",
      "publishedAt": "2026-07-22T09:05:03.000Z",
      "xQuery": "公立教員 精神疾患理由の退職最多"
    },
    {
      "time": "19:05",
      "title": "マット死 賠償巡る元少年の言い分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588934?source=rss",
      "publishedAt": "2026-07-22T10:05:36.000Z",
      "xQuery": "マット死 賠償巡る元少年の言い分"
    },
    {
      "time": "18:38",
      "title": "ルフトハンザ機 羽田に緊急着陸",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588932?source=rss",
      "publishedAt": "2026-07-22T09:38:20.000Z",
      "xQuery": "ルフトハンザ機 羽田に緊急着陸"
    },
    {
      "time": "18:03",
      "title": "廃墟ホテルに謎の巨大落書き 話題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588921?source=rss",
      "publishedAt": "2026-07-22T09:03:51.000Z",
      "xQuery": "廃墟ホテルに謎の巨大落書き 話題"
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
