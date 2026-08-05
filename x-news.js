window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T04:36:08.582Z",
  "items": [
    {
      "time": "12:47",
      "title": "新水俣-鹿児島中央 新幹線再開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590599?source=rss",
      "publishedAt": "2026-08-05T03:47:19.000Z",
      "xQuery": "新水俣-鹿児島中央 新幹線再開へ"
    },
    {
      "time": "12:11",
      "title": "台風13号 沖縄で影響が長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590590?source=rss",
      "publishedAt": "2026-08-05T03:11:15.000Z",
      "xQuery": "台風13号 沖縄で影響が長引く恐れ"
    },
    {
      "time": "11:49",
      "title": "北朝鮮 日本のトマホーク試射批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590588?source=rss",
      "publishedAt": "2026-08-05T02:49:49.000Z",
      "xQuery": "北朝鮮 日本のトマホーク試射批判"
    },
    {
      "time": "13:06",
      "title": "台船に女性遺体 死亡の夫書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590601?source=rss",
      "publishedAt": "2026-08-05T04:06:19.000Z",
      "xQuery": "台船に女性遺体 死亡の夫書類送検"
    },
    {
      "time": "11:27",
      "title": "トラックと衝突し車炎上 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590585?source=rss",
      "publishedAt": "2026-08-05T02:27:30.000Z",
      "xQuery": "トラックと衝突し車炎上 1人死亡"
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
