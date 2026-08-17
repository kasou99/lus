window.LUS_X_NEWS = {
  "updatedAt": "2026-08-17T22:40:58.366Z",
  "items": [
    {
      "time": "07:18",
      "title": "18日九州や山陰など35℃超 対策を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592125?source=rss",
      "publishedAt": "2026-08-17T22:18:17.000Z",
      "xQuery": "18日九州や山陰など35℃超 対策を"
    },
    {
      "time": "22:36",
      "title": "豪雨で車が浸水 金銭負担が心配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592117?source=rss",
      "publishedAt": "2026-08-17T13:36:51.000Z",
      "xQuery": "豪雨で車が浸水 金銭負担が心配"
    },
    {
      "time": "07:05",
      "title": "露が日本大使に出頭要請 抗議受け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592124?source=rss",
      "publishedAt": "2026-08-17T22:05:13.000Z",
      "xQuery": "露が日本大使に出頭要請 抗議受け"
    },
    {
      "time": "06:36",
      "title": "ゴルフ場で働く19歳自殺 労災認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592122?source=rss",
      "publishedAt": "2026-08-17T21:36:04.000Z",
      "xQuery": "ゴルフ場で働く19歳自殺 労災認定"
    },
    {
      "time": "06:08",
      "title": "殺人未遂罪の被告が行方不明 函館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592120?source=rss",
      "publishedAt": "2026-08-17T21:08:10.000Z",
      "xQuery": "殺人未遂罪の被告が行方不明 函館"
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
