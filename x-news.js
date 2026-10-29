window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T00:35:35.996Z",
  "items": [
    {
      "time": "08:20",
      "title": "多くで今季一冷え込み 東京10℃台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600505?source=rss",
      "publishedAt": "2026-10-28T23:20:43.000Z",
      "xQuery": "多くで今季一冷え込み 東京10℃台"
    },
    {
      "time": "08:39",
      "title": "教員「特別免許」の基準明確化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600506?source=rss",
      "publishedAt": "2026-10-28T23:39:26.000Z",
      "xQuery": "教員「特別免許」の基準明確化へ"
    },
    {
      "time": "06:55",
      "title": "GMO脅迫サイト 国が遮断を要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600494?source=rss",
      "publishedAt": "2026-10-28T21:55:03.000Z",
      "xQuery": "GMO脅迫サイト 国が遮断を要請"
    },
    {
      "time": "08:46",
      "title": "プーチン氏 マスク氏は本物の天才",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600507?source=rss",
      "publishedAt": "2026-10-28T23:46:08.000Z",
      "xQuery": "プーチン氏 マスク氏は本物の天才"
    },
    {
      "time": "08:34",
      "title": "本や雑誌発売日 大阪も1日遅れに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600504?source=rss",
      "publishedAt": "2026-10-28T23:34:37.000Z",
      "xQuery": "本や雑誌発売日 大阪も1日遅れに"
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
