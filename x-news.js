window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T01:27:53.276Z",
  "items": [
    {
      "time": "08:00",
      "title": "改造内閣 非主流派結集のリスクも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595651?source=rss",
      "publishedAt": "2026-09-17T23:00:45.000Z",
      "xQuery": "改造内閣 非主流派結集のリスクも"
    },
    {
      "time": "08:22",
      "title": "英国王 AI企業幹部らに懸念示す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595656?source=rss",
      "publishedAt": "2026-09-17T23:22:09.000Z",
      "xQuery": "英国王 AI企業幹部らに懸念示す"
    },
    {
      "time": "08:20",
      "title": "ケーキ店死傷 店主らと口論か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595657?source=rss",
      "publishedAt": "2026-09-17T23:20:35.000Z",
      "xQuery": "ケーキ店死傷 店主らと口論か"
    },
    {
      "time": "10:08",
      "title": "生活道路で死亡ひき逃げ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595669?source=rss",
      "publishedAt": "2026-09-18T01:08:59.000Z",
      "xQuery": "生活道路で死亡ひき逃げ疑い 逮捕"
    },
    {
      "time": "09:51",
      "title": "東京ばな奈 35周年で工場取材解禁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595668?source=rss",
      "publishedAt": "2026-09-18T00:51:44.000Z",
      "xQuery": "東京ばな奈 35周年で工場取材解禁"
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
