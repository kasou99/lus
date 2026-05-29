window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T05:36:49.992Z",
  "items": [
    {
      "time": "13:54",
      "title": "在留手数料値上げ 改正入管法成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582167?source=rss",
      "publishedAt": "2026-05-29T04:54:41.000Z",
      "xQuery": "在留手数料値上げ 改正入管法成立"
    },
    {
      "time": "09:32",
      "title": "エボラ対策 ケニアに米隔離施設",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582125?source=rss",
      "publishedAt": "2026-05-29T00:32:55.000Z",
      "xQuery": "エボラ対策 ケニアに米隔離施設"
    },
    {
      "time": "13:59",
      "title": "緊急着陸 出発の羽田には異物散乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582166?source=rss",
      "publishedAt": "2026-05-29T04:59:39.000Z",
      "xQuery": "緊急着陸 出発の羽田には異物散乱"
    },
    {
      "time": "12:37",
      "title": "山梨女児不明 母苦しんだ「正論」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582151?source=rss",
      "publishedAt": "2026-05-29T03:37:15.000Z",
      "xQuery": "山梨女児不明 母苦しんだ「正論」"
    },
    {
      "time": "11:06",
      "title": "走行中の車から男性転落 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582139?source=rss",
      "publishedAt": "2026-05-29T02:06:47.000Z",
      "xQuery": "走行中の車から男性転落 意識不明"
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
