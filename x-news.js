window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T22:38:42.109Z",
  "items": [
    {
      "time": "06:32",
      "title": "台風接近 沖縄奄美は高波強風続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596789?source=rss",
      "publishedAt": "2026-09-27T21:32:49.000Z",
      "xQuery": "台風接近 沖縄奄美は高波強風続く"
    },
    {
      "time": "19:43",
      "title": "内閣支持率45%に上昇 毎日調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596760?source=rss",
      "publishedAt": "2026-09-27T10:43:46.000Z",
      "xQuery": "内閣支持率45%に上昇 毎日調査"
    },
    {
      "time": "07:17",
      "title": "熊本地震2カ月 井戸の復旧進まず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596792?source=rss",
      "publishedAt": "2026-09-27T22:17:44.000Z",
      "xQuery": "熊本地震2カ月 井戸の復旧進まず"
    },
    {
      "time": "07:30",
      "title": "横浜市長選 山中前市長が立候補へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596793?source=rss",
      "publishedAt": "2026-09-27T22:30:16.000Z",
      "xQuery": "横浜市長選 山中前市長が立候補へ"
    },
    {
      "time": "06:44",
      "title": "群馬殺害 男は事件当時と違う服装",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596790?source=rss",
      "publishedAt": "2026-09-27T21:44:14.000Z",
      "xQuery": "群馬殺害 男は事件当時と違う服装"
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
