window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T03:26:00.494Z",
  "items": [
    {
      "time": "11:33",
      "title": "米CIA長官が訪露 ウ情勢を協議か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593115?source=rss",
      "publishedAt": "2026-08-26T02:33:43.000Z",
      "xQuery": "米CIA長官が訪露 ウ情勢を協議か"
    },
    {
      "time": "12:00",
      "title": "4人死亡 事故直前まで線路上に7人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593119?source=rss",
      "publishedAt": "2026-08-26T03:00:19.000Z",
      "xQuery": "4人死亡 事故直前まで線路上に7人"
    },
    {
      "time": "11:56",
      "title": "子助けようとしたか 父流され死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593114?source=rss",
      "publishedAt": "2026-08-26T02:56:44.000Z",
      "xQuery": "子助けようとしたか 父流され死亡"
    },
    {
      "time": "11:34",
      "title": "路上に手りゅう弾か 近くに小学校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593113?source=rss",
      "publishedAt": "2026-08-26T02:34:08.000Z",
      "xQuery": "路上に手りゅう弾か 近くに小学校"
    },
    {
      "time": "10:26",
      "title": "「ゴーストレストラン」増加の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593104?source=rss",
      "publishedAt": "2026-08-26T01:26:13.000Z",
      "xQuery": "「ゴーストレストラン」増加の訳"
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
