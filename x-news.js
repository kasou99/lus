window.LUS_X_NEWS = {
  "updatedAt": "2026-11-03T01:38:46.081Z",
  "items": [
    {
      "time": "10:07",
      "title": "米・露・ウが10～11日に3者協議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601140?source=rss",
      "publishedAt": "2026-11-03T01:07:31.000Z",
      "xQuery": "米・露・ウが10～11日に3者協議"
    },
    {
      "time": "09:09",
      "title": "トランプ氏 演説で「口約束」連発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601130?source=rss",
      "publishedAt": "2026-11-03T00:09:15.000Z",
      "xQuery": "トランプ氏 演説で「口約束」連発"
    },
    {
      "time": "10:17",
      "title": "安いもやし限界 5年で13社消える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601141?source=rss",
      "publishedAt": "2026-11-03T01:17:07.000Z",
      "xQuery": "安いもやし限界 5年で13社消える"
    },
    {
      "time": "07:33",
      "title": "GMO会見で「命の砂時計」 意味",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601115?source=rss",
      "publishedAt": "2026-11-02T22:33:34.000Z",
      "xQuery": "GMO会見で「命の砂時計」 意味"
    },
    {
      "time": "09:01",
      "title": "鳥山明さん仕事場解体へ 惜しむ声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601126?source=rss",
      "publishedAt": "2026-11-03T00:01:42.000Z",
      "xQuery": "鳥山明さん仕事場解体へ 惜しむ声"
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
