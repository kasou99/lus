window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T10:09:58.938Z",
  "items": [
    {
      "time": "18:14",
      "title": "被災の老人ホーム 熱中症疑い続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590284?source=rss",
      "publishedAt": "2026-08-02T09:14:37.000Z",
      "xQuery": "被災の老人ホーム 熱中症疑い続出"
    },
    {
      "time": "17:02",
      "title": "移民流入のスペイン 海にフェンス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590274?source=rss",
      "publishedAt": "2026-08-02T08:02:59.000Z",
      "xQuery": "移民流入のスペイン 海にフェンス"
    },
    {
      "time": "16:54",
      "title": "給食がない夏休み 困窮世帯の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590273?source=rss",
      "publishedAt": "2026-08-02T07:54:04.000Z",
      "xQuery": "給食がない夏休み 困窮世帯の実態"
    },
    {
      "time": "17:54",
      "title": "地震で商品落下 コストコの回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590283?source=rss",
      "publishedAt": "2026-08-02T08:54:59.000Z",
      "xQuery": "地震で商品落下 コストコの回答"
    },
    {
      "time": "16:25",
      "title": "海岸で夫を撮影中に落石 女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590270?source=rss",
      "publishedAt": "2026-08-02T07:25:34.000Z",
      "xQuery": "海岸で夫を撮影中に落石 女性死亡"
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
