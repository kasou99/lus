window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T16:15:40.229Z",
  "items": [
    {
      "time": "23:20",
      "title": "消費減税で減収農家に給付金 方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593076?source=rss",
      "publishedAt": "2026-08-25T14:20:57.000Z",
      "xQuery": "消費減税で減収農家に給付金 方針"
    },
    {
      "time": "23:29",
      "title": "米大統領 オンタリオ湖の改称検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593077?source=rss",
      "publishedAt": "2026-08-25T14:29:13.000Z",
      "xQuery": "米大統領 オンタリオ湖の改称検討"
    },
    {
      "time": "00:16",
      "title": "崖下200メートルに車転落か 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593079?source=rss",
      "publishedAt": "2026-08-25T15:16:01.000Z",
      "xQuery": "崖下200メートルに車転落か 死亡"
    },
    {
      "time": "22:26",
      "title": "3児失う事故から20年 4児と歩む母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593071?source=rss",
      "publishedAt": "2026-08-25T13:26:09.000Z",
      "xQuery": "3児失う事故から20年 4児と歩む母"
    },
    {
      "time": "21:45",
      "title": "パン39kg点々と投棄 環境相が非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593064?source=rss",
      "publishedAt": "2026-08-25T12:45:36.000Z",
      "xQuery": "パン39kg点々と投棄 環境相が非難"
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
