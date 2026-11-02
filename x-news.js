window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T12:17:36.333Z",
  "items": [
    {
      "time": "20:45",
      "title": "中間選挙 物価高で米大統領に批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601095?source=rss",
      "publishedAt": "2026-11-02T11:45:45.000Z",
      "xQuery": "中間選挙 物価高で米大統領に批判"
    },
    {
      "time": "19:03",
      "title": "10月気温 過去2番目の暑さだった",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601084?source=rss",
      "publishedAt": "2026-11-02T10:03:01.000Z",
      "xQuery": "10月気温 過去2番目の暑さだった"
    },
    {
      "time": "20:50",
      "title": "GMO熊谷社長会見 涙浮かべ陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601094?source=rss",
      "publishedAt": "2026-11-02T11:50:05.000Z",
      "xQuery": "GMO熊谷社長会見 涙浮かべ陳謝"
    },
    {
      "time": "19:33",
      "title": "GMO社長 自身のSNS休止に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601087?source=rss",
      "publishedAt": "2026-11-02T10:33:44.000Z",
      "xQuery": "GMO社長 自身のSNS休止に言及"
    },
    {
      "time": "17:40",
      "title": "特殊詐欺Gのリーダーか 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601076?source=rss",
      "publishedAt": "2026-11-02T08:40:23.000Z",
      "xQuery": "特殊詐欺Gのリーダーか 男を逮捕"
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
