window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T07:54:24.542Z",
  "items": [
    {
      "time": "15:49",
      "title": "全国初レベル4氾濫危険警報 宮崎",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582674?source=rss",
      "publishedAt": "2026-06-02T06:49:06.000Z",
      "xQuery": "全国初レベル4氾濫危険警報 宮崎"
    },
    {
      "time": "15:09",
      "title": "台風 各地で線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582669?source=rss",
      "publishedAt": "2026-06-02T06:09:51.000Z",
      "xQuery": "台風 各地で線状降水帯発生の恐れ"
    },
    {
      "time": "15:24",
      "title": "ゴミ袋買えない苦情相次ぎ 市調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582672?source=rss",
      "publishedAt": "2026-06-02T06:24:11.000Z",
      "xQuery": "ゴミ袋買えない苦情相次ぎ 市調査"
    },
    {
      "time": "14:04",
      "title": "マンジャロSNSで拡散 副作用も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582667?source=rss",
      "publishedAt": "2026-06-02T05:04:08.000Z",
      "xQuery": "マンジャロSNSで拡散 副作用も"
    },
    {
      "time": "15:22",
      "title": "中華料理店の倒産 減少の可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582671?source=rss",
      "publishedAt": "2026-06-02T06:22:43.000Z",
      "xQuery": "中華料理店の倒産 減少の可能性"
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
