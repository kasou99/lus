window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T04:35:50.951Z",
  "items": [
    {
      "time": "13:11",
      "title": "防災相 世界一の防災大国を目指す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601050?source=rss",
      "publishedAt": "2026-11-02T04:11:59.000Z",
      "xQuery": "防災相 世界一の防災大国を目指す"
    },
    {
      "time": "11:38",
      "title": "人質をとり立てこもり疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601041?source=rss",
      "publishedAt": "2026-11-02T02:38:54.000Z",
      "xQuery": "人質をとり立てこもり疑い 男逮捕"
    },
    {
      "time": "12:39",
      "title": "フラット35 金利3.81%で過去2番目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601048?source=rss",
      "publishedAt": "2026-11-02T03:39:43.000Z",
      "xQuery": "フラット35 金利3.81%で過去2番目"
    },
    {
      "time": "11:47",
      "title": "盗まれた高級腕時計 宅配便で返却",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601043?source=rss",
      "publishedAt": "2026-11-02T02:47:36.000Z",
      "xQuery": "盗まれた高級腕時計 宅配便で返却"
    },
    {
      "time": "12:13",
      "title": "同僚から盗撮被害 会社を訴えた訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601046?source=rss",
      "publishedAt": "2026-11-02T03:13:14.000Z",
      "xQuery": "同僚から盗撮被害 会社を訴えた訳"
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
