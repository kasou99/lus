window.LUS_X_NEWS = {
  "updatedAt": "2026-08-24T23:39:39.586Z",
  "items": [
    {
      "time": "07:48",
      "title": "ウ侵略4年半 欧州の結束アピール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592958?source=rss",
      "publishedAt": "2026-08-24T22:48:06.000Z",
      "xQuery": "ウ侵略4年半 欧州の結束アピール"
    },
    {
      "time": "07:33",
      "title": "同志社理事長辞任へ 辺野古事故で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592956?source=rss",
      "publishedAt": "2026-08-24T22:33:49.000Z",
      "xQuery": "同志社理事長辞任へ 辺野古事故で"
    },
    {
      "time": "07:00",
      "title": "相模原17歳死亡 ぼう然とする友人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592952?source=rss",
      "publishedAt": "2026-08-24T22:00:57.000Z",
      "xQuery": "相模原17歳死亡 ぼう然とする友人"
    },
    {
      "time": "07:22",
      "title": "住宅に身元不明の3人の遺体 岐阜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592954?source=rss",
      "publishedAt": "2026-08-24T22:22:33.000Z",
      "xQuery": "住宅に身元不明の3人の遺体 岐阜"
    },
    {
      "time": "07:51",
      "title": "警視庁警官3060人欠員 採用不調か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592957?source=rss",
      "publishedAt": "2026-08-24T22:51:13.000Z",
      "xQuery": "警視庁警官3060人欠員 採用不調か"
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
