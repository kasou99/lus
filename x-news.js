window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T00:32:36.414Z",
  "items": [
    {
      "time": "07:35",
      "title": "関文科相の辞任論 与党内で拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603489?source=rss",
      "publishedAt": "2026-11-21T22:35:13.000Z",
      "xQuery": "関文科相の辞任論 与党内で拡大"
    },
    {
      "time": "08:49",
      "title": "氷河期世代の正社員率改善も 格差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603504?source=rss",
      "publishedAt": "2026-11-21T23:49:12.000Z",
      "xQuery": "氷河期世代の正社員率改善も 格差"
    },
    {
      "time": "07:50",
      "title": "DIYで溶接中に出火か 男性が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603493?source=rss",
      "publishedAt": "2026-11-21T22:50:49.000Z",
      "xQuery": "DIYで溶接中に出火か 男性が死亡"
    },
    {
      "time": "08:22",
      "title": "「叱らない育児」を意識 悩む母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603500?source=rss",
      "publishedAt": "2026-11-21T23:22:49.000Z",
      "xQuery": "「叱らない育児」を意識 悩む母"
    },
    {
      "time": "08:39",
      "title": "村上春樹さんが村上龍さんを追悼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603503?source=rss",
      "publishedAt": "2026-11-21T23:39:54.000Z",
      "xQuery": "村上春樹さんが村上龍さんを追悼"
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
