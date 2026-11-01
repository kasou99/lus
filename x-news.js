window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T04:12:31.470Z",
  "items": [
    {
      "time": "09:59",
      "title": "英首相 奴隷貿易で正式謝罪を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600907?source=rss",
      "publishedAt": "2026-11-01T00:59:17.000Z",
      "xQuery": "英首相 奴隷貿易で正式謝罪を検討"
    },
    {
      "time": "09:08",
      "title": "出国時に返金 新免税制度が開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600900?source=rss",
      "publishedAt": "2026-11-01T00:08:57.000Z",
      "xQuery": "出国時に返金 新免税制度が開始"
    },
    {
      "time": "11:45",
      "title": "クマ放獣3日で出戻り 秦野市驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600922?source=rss",
      "publishedAt": "2026-11-01T02:45:31.000Z",
      "xQuery": "クマ放獣3日で出戻り 秦野市驚き"
    },
    {
      "time": "12:20",
      "title": "歩行者5人はねられ1人重傷 宮城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600926?source=rss",
      "publishedAt": "2026-11-01T03:20:01.000Z",
      "xQuery": "歩行者5人はねられ1人重傷 宮城"
    },
    {
      "time": "11:12",
      "title": "長すぎベルト「落ち感」引き出す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600919?source=rss",
      "publishedAt": "2026-11-01T02:12:42.000Z",
      "xQuery": "長すぎベルト「落ち感」引き出す"
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
