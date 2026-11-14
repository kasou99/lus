window.LUS_X_NEWS = {
  "updatedAt": "2026-11-14T00:29:22.529Z",
  "items": [
    {
      "time": "09:02",
      "title": "米中露首脳会談 19日に中国で開催",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602511?source=rss",
      "publishedAt": "2026-11-14T00:02:05.000Z",
      "xQuery": "米中露首脳会談 19日に中国で開催"
    },
    {
      "time": "08:42",
      "title": "全米空港で地上待機命令 通信障害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602503?source=rss",
      "publishedAt": "2026-11-13T23:42:11.000Z",
      "xQuery": "全米空港で地上待機命令 通信障害"
    },
    {
      "time": "08:17",
      "title": "バンス氏 米大統領選見送り検討か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602499?source=rss",
      "publishedAt": "2026-11-13T23:17:38.000Z",
      "xQuery": "バンス氏 米大統領選見送り検討か"
    },
    {
      "time": "08:55",
      "title": "マイクロソフト 大規模障害を謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602508?source=rss",
      "publishedAt": "2026-11-13T23:55:42.000Z",
      "xQuery": "マイクロソフト 大規模障害を謝罪"
    },
    {
      "time": "08:47",
      "title": "3歳暴行死 虐待疑い通告5回あった",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602507?source=rss",
      "publishedAt": "2026-11-13T23:47:27.000Z",
      "xQuery": "3歳暴行死 虐待疑い通告5回あった"
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
