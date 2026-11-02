window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T23:10:00.265Z",
  "items": [
    {
      "time": "07:45",
      "title": "米中間選挙 今夜から全米で投票",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601118?source=rss",
      "publishedAt": "2026-11-02T22:45:59.000Z",
      "xQuery": "米中間選挙 今夜から全米で投票"
    },
    {
      "time": "08:06",
      "title": "秋の叙勲 松坂慶子さんら受章",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601122?source=rss",
      "publishedAt": "2026-11-02T23:06:44.000Z",
      "xQuery": "秋の叙勲 松坂慶子さんら受章"
    },
    {
      "time": "07:06",
      "title": "スペイン列車事故 邦人死亡2人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601111?source=rss",
      "publishedAt": "2026-11-02T22:06:06.000Z",
      "xQuery": "スペイン列車事故 邦人死亡2人に"
    },
    {
      "time": "07:47",
      "title": "関東で濃霧発生 車の運転など注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601119?source=rss",
      "publishedAt": "2026-11-02T22:47:09.000Z",
      "xQuery": "関東で濃霧発生 車の運転など注意"
    },
    {
      "time": "07:29",
      "title": "医療インバウンド 厚労省が検証へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601113?source=rss",
      "publishedAt": "2026-11-02T22:29:06.000Z",
      "xQuery": "医療インバウンド 厚労省が検証へ"
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
