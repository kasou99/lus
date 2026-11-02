window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T20:35:21.359Z",
  "items": [
    {
      "time": "20:45",
      "title": "中間選挙 物価高で米大統領に批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601095?source=rss",
      "publishedAt": "2026-11-02T11:45:45.000Z",
      "xQuery": "中間選挙 物価高で米大統領に批判"
    },
    {
      "time": "23:08",
      "title": "GMOが謝罪 利用者「響かない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601107?source=rss",
      "publishedAt": "2026-11-02T14:08:17.000Z",
      "xQuery": "GMOが謝罪 利用者「響かない」"
    },
    {
      "time": "22:26",
      "title": "ノジマ 700万人分の個人情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601104?source=rss",
      "publishedAt": "2026-11-02T13:26:39.000Z",
      "xQuery": "ノジマ 700万人分の個人情報流出"
    },
    {
      "time": "00:04",
      "title": "トンネルで2台正面衝突 30代死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601110?source=rss",
      "publishedAt": "2026-11-02T15:04:06.000Z",
      "xQuery": "トンネルで2台正面衝突 30代死亡"
    },
    {
      "time": "23:38",
      "title": "7歳虐待死 裁判でにじむ母の後悔",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601108?source=rss",
      "publishedAt": "2026-11-02T14:38:58.000Z",
      "xQuery": "7歳虐待死 裁判でにじむ母の後悔"
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
