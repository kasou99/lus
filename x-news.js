window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T04:21:44.364Z",
  "items": [
    {
      "time": "11:34",
      "title": "記者拘束 人道的配慮要求と茂木氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598703?source=rss",
      "publishedAt": "2026-10-14T02:34:49.000Z",
      "xQuery": "記者拘束 人道的配慮要求と茂木氏"
    },
    {
      "time": "13:01",
      "title": "PayPay証券 システム障害が解消",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598720?source=rss",
      "publishedAt": "2026-10-14T04:01:42.000Z",
      "xQuery": "PayPay証券 システム障害が解消"
    },
    {
      "time": "11:47",
      "title": "簗氏 バス送迎の答弁を事実上修正",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598707?source=rss",
      "publishedAt": "2026-10-14T02:47:41.000Z",
      "xQuery": "簗氏 バス送迎の答弁を事実上修正"
    },
    {
      "time": "10:26",
      "title": "動物避けようとして車転落か 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598697?source=rss",
      "publishedAt": "2026-10-14T01:26:21.000Z",
      "xQuery": "動物避けようとして車転落か 死亡"
    },
    {
      "time": "12:11",
      "title": "給食に「貧相すぎ」と批判 市回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598715?source=rss",
      "publishedAt": "2026-10-14T03:11:33.000Z",
      "xQuery": "給食に「貧相すぎ」と批判 市回答"
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
