window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T14:41:20.751Z",
  "items": [
    {
      "time": "23:12",
      "title": "農相辞表 内閣改造後わずか1カ月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598790?source=rss",
      "publishedAt": "2026-10-14T14:12:54.000Z",
      "xQuery": "農相辞表 内閣改造後わずか1カ月"
    },
    {
      "time": "22:38",
      "title": "公明 統一選での協力解消を伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598785?source=rss",
      "publishedAt": "2026-10-14T13:38:57.000Z",
      "xQuery": "公明 統一選での協力解消を伝達"
    },
    {
      "time": "22:18",
      "title": "日銀利上げ 2%超える可能性は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598757?source=rss",
      "publishedAt": "2026-10-14T13:18:09.000Z",
      "xQuery": "日銀利上げ 2%超える可能性は"
    },
    {
      "time": "22:01",
      "title": "新宿109KENZO 池田容疑者を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598783?source=rss",
      "publishedAt": "2026-10-14T13:01:56.000Z",
      "xQuery": "新宿109KENZO 池田容疑者を逮捕"
    },
    {
      "time": "17:53",
      "title": "阪急電鉄 中吊広告を来年4月終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598751?source=rss",
      "publishedAt": "2026-10-14T08:53:13.000Z",
      "xQuery": "阪急電鉄 中吊広告を来年4月終了"
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
