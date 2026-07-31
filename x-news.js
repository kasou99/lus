window.LUS_X_NEWS = {
  "updatedAt": "2026-07-31T12:46:10.522Z",
  "items": [
    {
      "time": "21:40",
      "title": "熊本地震の死者36人に 県発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590073?source=rss",
      "publishedAt": "2026-07-31T12:40:28.000Z",
      "xQuery": "熊本地震の死者36人に 県発表"
    },
    {
      "time": "20:08",
      "title": "被災自治体に支援 税繰り上げ交付",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590065?source=rss",
      "publishedAt": "2026-07-31T11:08:03.000Z",
      "xQuery": "被災自治体に支援 税繰り上げ交付"
    },
    {
      "time": "21:07",
      "title": "約6～9兆円規模の為替介入か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590071?source=rss",
      "publishedAt": "2026-07-31T12:07:58.000Z",
      "xQuery": "約6～9兆円規模の為替介入か"
    },
    {
      "time": "20:02",
      "title": "イオンモール宇城 下敷き男性救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590066?source=rss",
      "publishedAt": "2026-07-31T11:02:38.000Z",
      "xQuery": "イオンモール宇城 下敷き男性救助"
    },
    {
      "time": "20:46",
      "title": "イオン爆発 娘を亡くした母の心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590068?source=rss",
      "publishedAt": "2026-07-31T11:46:47.000Z",
      "xQuery": "イオン爆発 娘を亡くした母の心境"
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
