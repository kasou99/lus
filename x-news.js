window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T05:48:13.351Z",
  "items": [
    {
      "time": "13:23",
      "title": "台風 西～東日本は3日にかけ警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582538?source=rss",
      "publishedAt": "2026-06-01T04:23:35.000Z",
      "xQuery": "台風 西～東日本は3日にかけ警戒"
    },
    {
      "time": "14:40",
      "title": "米AI事業に日本参画 対中優位狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582544?source=rss",
      "publishedAt": "2026-06-01T05:40:32.000Z",
      "xQuery": "米AI事業に日本参画 対中優位狙い"
    },
    {
      "time": "12:25",
      "title": "トランプ氏 なぜオマーンを威嚇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582523?source=rss",
      "publishedAt": "2026-06-01T03:25:36.000Z",
      "xQuery": "トランプ氏 なぜオマーンを威嚇"
    },
    {
      "time": "12:35",
      "title": "フラット35 最低金利が初の3%超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582532?source=rss",
      "publishedAt": "2026-06-01T03:35:26.000Z",
      "xQuery": "フラット35 最低金利が初の3%超"
    },
    {
      "time": "14:03",
      "title": "2人死亡 バス衝突後引きずったか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582540?source=rss",
      "publishedAt": "2026-06-01T05:03:48.000Z",
      "xQuery": "2人死亡 バス衝突後引きずったか"
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
