window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T10:44:55.348Z",
  "items": [
    {
      "time": "18:07",
      "title": "ガソリン補助金継続へ 高市氏表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593042?source=rss",
      "publishedAt": "2026-08-25T09:07:36.000Z",
      "xQuery": "ガソリン補助金継続へ 高市氏表明"
    },
    {
      "time": "18:41",
      "title": "小泉防衛相 保守層の評価なぜ反転",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593044?source=rss",
      "publishedAt": "2026-08-25T09:41:02.000Z",
      "xQuery": "小泉防衛相 保守層の評価なぜ反転"
    },
    {
      "time": "19:02",
      "title": "犯行10秒 2億円相当の腕時計窃盗",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593050?source=rss",
      "publishedAt": "2026-08-25T10:02:49.000Z",
      "xQuery": "犯行10秒 2億円相当の腕時計窃盗"
    },
    {
      "time": "18:48",
      "title": "高校生死亡した祭り 2年前も事故",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593049?source=rss",
      "publishedAt": "2026-08-25T09:48:27.000Z",
      "xQuery": "高校生死亡した祭り 2年前も事故"
    },
    {
      "time": "17:53",
      "title": "米デスバレー立ち往生 観光客死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593039?source=rss",
      "publishedAt": "2026-08-25T08:53:13.000Z",
      "xQuery": "米デスバレー立ち往生 観光客死亡"
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
