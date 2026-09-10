window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T14:16:44.806Z",
  "items": [
    {
      "time": "18:54",
      "title": "ニデック創業者らに株主代表訴訟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594887?source=rss",
      "publishedAt": "2026-09-10T09:54:25.000Z",
      "xQuery": "ニデック創業者らに株主代表訴訟"
    },
    {
      "time": "21:04",
      "title": "3台絡む事故で3人死傷 逆走と通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594899?source=rss",
      "publishedAt": "2026-09-10T12:04:21.000Z",
      "xQuery": "3台絡む事故で3人死傷 逆走と通報"
    },
    {
      "time": "18:13",
      "title": "感染性ある口蹄疫 空港検疫で確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594879?source=rss",
      "publishedAt": "2026-09-10T09:13:10.000Z",
      "xQuery": "感染性ある口蹄疫 空港検疫で確認"
    },
    {
      "time": "19:19",
      "title": "千葉豪雨解析 気象庁の担当も驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594890?source=rss",
      "publishedAt": "2026-09-10T10:19:13.000Z",
      "xQuery": "千葉豪雨解析 気象庁の担当も驚き"
    },
    {
      "time": "17:02",
      "title": "減少止まらぬ銭湯 活路にサウナ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594870?source=rss",
      "publishedAt": "2026-09-10T08:02:47.000Z",
      "xQuery": "減少止まらぬ銭湯 活路にサウナ"
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
