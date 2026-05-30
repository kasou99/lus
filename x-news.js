window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T11:35:31.356Z",
  "items": [
    {
      "time": "18:53",
      "title": "台風 2-4日は西-北日本も大荒れに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582325?source=rss",
      "publishedAt": "2026-05-30T09:53:41.000Z",
      "xQuery": "台風 2-4日は西-北日本も大荒れに"
    },
    {
      "time": "16:48",
      "title": "ごみ30%減も処理費2.4兆円 なぜ増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582311?source=rss",
      "publishedAt": "2026-05-30T07:48:23.000Z",
      "xQuery": "ごみ30%減も処理費2.4兆円 なぜ増"
    },
    {
      "time": "20:04",
      "title": "93歳運転する車がはねる 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582330?source=rss",
      "publishedAt": "2026-05-30T11:04:09.000Z",
      "xQuery": "93歳運転する車がはねる 男性死亡"
    },
    {
      "time": "18:40",
      "title": "万引き客脅し金要求疑い 店長逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582323?source=rss",
      "publishedAt": "2026-05-30T09:40:51.000Z",
      "xQuery": "万引き客脅し金要求疑い 店長逮捕"
    },
    {
      "time": "19:37",
      "title": "中学校で詐欺被害 1000万円超か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582329?source=rss",
      "publishedAt": "2026-05-30T10:37:17.000Z",
      "xQuery": "中学校で詐欺被害 1000万円超か"
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
