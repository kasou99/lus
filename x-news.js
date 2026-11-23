window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T20:10:21.052Z",
  "items": [
    {
      "time": "23:10",
      "title": "COP 脱化石遅れで農業へ影響深刻",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603730?source=rss",
      "publishedAt": "2026-11-23T14:10:38.000Z",
      "xQuery": "COP 脱化石遅れで農業へ影響深刻"
    },
    {
      "time": "23:44",
      "title": "米大統領 フアン氏のCEO復帰歓迎",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603733?source=rss",
      "publishedAt": "2026-11-23T14:44:13.000Z",
      "xQuery": "米大統領 フアン氏のCEO復帰歓迎"
    },
    {
      "time": "23:17",
      "title": "フアン氏 エヌビディアCEOに復帰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603732?source=rss",
      "publishedAt": "2026-11-23T14:17:46.000Z",
      "xQuery": "フアン氏 エヌビディアCEOに復帰"
    },
    {
      "time": "23:08",
      "title": "「演説妨害」規制への議論 焦点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603729?source=rss",
      "publishedAt": "2026-11-23T14:08:42.000Z",
      "xQuery": "「演説妨害」規制への議論 焦点は"
    },
    {
      "time": "20:37",
      "title": "交番で警官死亡 拳銃使われた形跡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603711?source=rss",
      "publishedAt": "2026-11-23T11:37:40.000Z",
      "xQuery": "交番で警官死亡 拳銃使われた形跡"
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
