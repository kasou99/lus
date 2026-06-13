window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T00:02:55.658Z",
  "items": [
    {
      "time": "08:27",
      "title": "重要鉱物備蓄G7連携 首相提唱へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584040?source=rss",
      "publishedAt": "2026-06-12T23:27:34.000Z",
      "xQuery": "重要鉱物備蓄G7連携 首相提唱へ"
    },
    {
      "time": "08:45",
      "title": "米イラン 署名へ詰めの調整か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584045?source=rss",
      "publishedAt": "2026-06-12T23:45:14.000Z",
      "xQuery": "米イラン 署名へ詰めの調整か"
    },
    {
      "time": "07:21",
      "title": "マスク氏 世界初の「兆万長者」に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584035?source=rss",
      "publishedAt": "2026-06-12T22:21:37.000Z",
      "xQuery": "マスク氏 世界初の「兆万長者」に"
    },
    {
      "time": "08:01",
      "title": "ふるさと納税863億円赤字 24年度",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584038?source=rss",
      "publishedAt": "2026-06-12T23:01:49.000Z",
      "xQuery": "ふるさと納税863億円赤字 24年度"
    },
    {
      "time": "07:43",
      "title": "クマと軽が衝突し運転手搬送 宮城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584036?source=rss",
      "publishedAt": "2026-06-12T22:43:09.000Z",
      "xQuery": "クマと軽が衝突し運転手搬送 宮城"
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
