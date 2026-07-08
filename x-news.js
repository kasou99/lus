window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T09:20:50.006Z",
  "items": [
    {
      "time": "17:02",
      "title": "国会 衆議院も正常化する見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587184?source=rss",
      "publishedAt": "2026-07-08T08:02:55.000Z",
      "xQuery": "国会 衆議院も正常化する見通し"
    },
    {
      "time": "16:26",
      "title": "攻撃被害続く ホルムズ通航量減少",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587176?source=rss",
      "publishedAt": "2026-07-08T07:26:22.000Z",
      "xQuery": "攻撃被害続く ホルムズ通航量減少"
    },
    {
      "time": "17:51",
      "title": "首相週末に終日公邸 安倍氏の10倍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587193?source=rss",
      "publishedAt": "2026-07-08T08:51:23.000Z",
      "xQuery": "首相週末に終日公邸 安倍氏の10倍"
    },
    {
      "time": "17:30",
      "title": "全東信破産 20年前から粉飾決算か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587189?source=rss",
      "publishedAt": "2026-07-08T08:30:48.000Z",
      "xQuery": "全東信破産 20年前から粉飾決算か"
    },
    {
      "time": "17:54",
      "title": "事故で乳児重体 救出者「生きろ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587194?source=rss",
      "publishedAt": "2026-07-08T08:54:54.000Z",
      "xQuery": "事故で乳児重体 救出者「生きろ」"
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
