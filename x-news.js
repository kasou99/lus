window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T00:44:05.959Z",
  "items": [
    {
      "time": "09:26",
      "title": "日経平均 一時2000円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598820?source=rss",
      "publishedAt": "2026-10-15T00:26:26.000Z",
      "xQuery": "日経平均 一時2000円以上値下がり"
    },
    {
      "time": "06:38",
      "title": "農相辞任「当然」地元有権者怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598798?source=rss",
      "publishedAt": "2026-10-14T21:38:41.000Z",
      "xQuery": "農相辞任「当然」地元有権者怒り"
    },
    {
      "time": "08:14",
      "title": "AIが自己改善「超知能」に危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598809?source=rss",
      "publishedAt": "2026-10-14T23:14:44.000Z",
      "xQuery": "AIが自己改善「超知能」に危機感"
    },
    {
      "time": "09:11",
      "title": "米8州がオープンAIを提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598818?source=rss",
      "publishedAt": "2026-10-15T00:11:35.000Z",
      "xQuery": "米8州がオープンAIを提訴"
    },
    {
      "time": "07:37",
      "title": "米上場の半導体株 下落止まらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598805?source=rss",
      "publishedAt": "2026-10-14T22:37:50.000Z",
      "xQuery": "米上場の半導体株 下落止まらず"
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
