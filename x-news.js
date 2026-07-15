window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T13:36:14.505Z",
  "items": [
    {
      "time": "19:15",
      "title": "ニチレイ障害 サイバー攻撃が原因",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588070?source=rss",
      "publishedAt": "2026-07-15T10:15:56.000Z",
      "xQuery": "ニチレイ障害 サイバー攻撃が原因"
    },
    {
      "time": "20:40",
      "title": "「検察なめんな」法廷で映像上映",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588077?source=rss",
      "publishedAt": "2026-07-15T11:40:04.000Z",
      "xQuery": "「検察なめんな」法廷で映像上映"
    },
    {
      "time": "18:55",
      "title": "党首討論 消費減税など激しい論戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588068?source=rss",
      "publishedAt": "2026-07-15T09:55:36.000Z",
      "xQuery": "党首討論 消費減税など激しい論戦"
    },
    {
      "time": "21:46",
      "title": "便混入で殺害か 死因は多臓器不全",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588080?source=rss",
      "publishedAt": "2026-07-15T12:46:18.000Z",
      "xQuery": "便混入で殺害か 死因は多臓器不全"
    },
    {
      "time": "21:33",
      "title": "若林さん 選考評価も直木賞ならず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588081?source=rss",
      "publishedAt": "2026-07-15T12:33:45.000Z",
      "xQuery": "若林さん 選考評価も直木賞ならず"
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
