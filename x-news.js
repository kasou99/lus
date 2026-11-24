window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T03:36:03.967Z",
  "items": [
    {
      "time": "11:44",
      "title": "野党 文科相への問責案提出で一致",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603783?source=rss",
      "publishedAt": "2026-11-24T02:44:46.000Z",
      "xQuery": "野党 文科相への問責案提出で一致"
    },
    {
      "time": "09:08",
      "title": "障害者手帳交付遅れ調査怠る 宮城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603757?source=rss",
      "publishedAt": "2026-11-24T00:08:58.000Z",
      "xQuery": "障害者手帳交付遅れ調査怠る 宮城"
    },
    {
      "time": "11:58",
      "title": "松屋の一人負け? 牛丼業界で明暗",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603780?source=rss",
      "publishedAt": "2026-11-24T02:58:23.000Z",
      "xQuery": "松屋の一人負け? 牛丼業界で明暗"
    },
    {
      "time": "12:28",
      "title": "集落で謎の渋滞 スマホナビ原因か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603790?source=rss",
      "publishedAt": "2026-11-24T03:28:55.000Z",
      "xQuery": "集落で謎の渋滞 スマホナビ原因か"
    },
    {
      "time": "11:54",
      "title": "ミスド並び方に戸惑いも 運営見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603786?source=rss",
      "publishedAt": "2026-11-24T02:54:09.000Z",
      "xQuery": "ミスド並び方に戸惑いも 運営見解"
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
