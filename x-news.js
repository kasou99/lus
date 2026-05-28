window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T10:55:05.553Z",
  "items": [
    {
      "time": "17:11",
      "title": "米大統領 同盟国オマーンを脅迫か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582049?source=rss",
      "publishedAt": "2026-05-28T08:11:56.000Z",
      "xQuery": "米大統領 同盟国オマーンを脅迫か"
    },
    {
      "time": "17:53",
      "title": "中傷動画報道 高市首相改めて否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582059?source=rss",
      "publishedAt": "2026-05-28T08:53:43.000Z",
      "xQuery": "中傷動画報道 高市首相改めて否定"
    },
    {
      "time": "17:44",
      "title": "東京・昭島市に大型獣か 注意喚起",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582056?source=rss",
      "publishedAt": "2026-05-28T08:44:29.000Z",
      "xQuery": "東京・昭島市に大型獣か 注意喚起"
    },
    {
      "time": "17:33",
      "title": "知事がランニングで骨折 公務欠席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582053?source=rss",
      "publishedAt": "2026-05-28T08:33:24.000Z",
      "xQuery": "知事がランニングで骨折 公務欠席"
    },
    {
      "time": "19:35",
      "title": "クマ捕獲に過剰な苦情 町長ら訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582071?source=rss",
      "publishedAt": "2026-05-28T10:35:43.000Z",
      "xQuery": "クマ捕獲に過剰な苦情 町長ら訴え"
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
