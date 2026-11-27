window.LUS_X_NEWS = {
  "updatedAt": "2026-11-27T06:20:11.474Z",
  "items": [
    {
      "time": "13:23",
      "title": "首相 関文科相を続投させる構え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604175?source=rss",
      "publishedAt": "2026-11-27T04:23:01.000Z",
      "xQuery": "首相 関文科相を続投させる構え"
    },
    {
      "time": "12:51",
      "title": "28日は関東で警報級大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604174?source=rss",
      "publishedAt": "2026-11-27T03:51:33.000Z",
      "xQuery": "28日は関東で警報級大雨の恐れ"
    },
    {
      "time": "14:59",
      "title": "第3子以降出産で1千万円 自民が案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604188?source=rss",
      "publishedAt": "2026-11-27T05:59:41.000Z",
      "xQuery": "第3子以降出産で1千万円 自民が案"
    },
    {
      "time": "13:36",
      "title": "食べ残し持ち帰り 政府が呼びかけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604166?source=rss",
      "publishedAt": "2026-11-27T04:36:49.000Z",
      "xQuery": "食べ残し持ち帰り 政府が呼びかけ"
    },
    {
      "time": "14:11",
      "title": "施設の屋上から缶投げ捨て 車損傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604183?source=rss",
      "publishedAt": "2026-11-27T05:11:58.000Z",
      "xQuery": "施設の屋上から缶投げ捨て 車損傷"
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
