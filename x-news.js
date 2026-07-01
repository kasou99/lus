window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T23:35:40.726Z",
  "items": [
    {
      "time": "08:27",
      "title": "九州から関東 午前は激しい雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586415?source=rss",
      "publishedAt": "2026-07-01T23:27:21.000Z",
      "xQuery": "九州から関東 午前は激しい雨警戒"
    },
    {
      "time": "07:23",
      "title": "インド事業創出の投資 2兆円規模",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586408?source=rss",
      "publishedAt": "2026-07-01T22:23:16.000Z",
      "xQuery": "インド事業創出の投資 2兆円規模"
    },
    {
      "time": "07:34",
      "title": "ベネズエラ地震1週間 死者2千人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586410?source=rss",
      "publishedAt": "2026-07-01T22:34:25.000Z",
      "xQuery": "ベネズエラ地震1週間 死者2千人超"
    },
    {
      "time": "07:52",
      "title": "PS新作のディスク版終了へ 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586411?source=rss",
      "publishedAt": "2026-07-01T22:52:24.000Z",
      "xQuery": "PS新作のディスク版終了へ 背景"
    },
    {
      "time": "07:22",
      "title": "メキシコ16強祝賀で混乱 死者も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586409?source=rss",
      "publishedAt": "2026-07-01T22:22:53.000Z",
      "xQuery": "メキシコ16強祝賀で混乱 死者も"
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
