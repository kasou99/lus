window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T00:33:25.955Z",
  "items": [
    {
      "time": "08:30",
      "title": "米民主党が下‌院で258議席 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603631?source=rss",
      "publishedAt": "2026-11-22T23:30:14.000Z",
      "xQuery": "米民主党が下‌院で258議席 報道"
    },
    {
      "time": "07:35",
      "title": "連休最終日 西-東日本は行楽日和",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603622?source=rss",
      "publishedAt": "2026-11-22T22:35:06.000Z",
      "xQuery": "連休最終日 西-東日本は行楽日和"
    },
    {
      "time": "08:09",
      "title": "北極航路 温暖化で氷解け通航量増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603627?source=rss",
      "publishedAt": "2026-11-22T23:09:55.000Z",
      "xQuery": "北極航路 温暖化で氷解け通航量増"
    },
    {
      "time": "08:50",
      "title": "中央分離帯越え車と衝突 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603634?source=rss",
      "publishedAt": "2026-11-22T23:50:34.000Z",
      "xQuery": "中央分離帯越え車と衝突 男を逮捕"
    },
    {
      "time": "08:08",
      "title": "SOS見せず突然退職 企業どう防ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603628?source=rss",
      "publishedAt": "2026-11-22T23:08:33.000Z",
      "xQuery": "SOS見せず突然退職 企業どう防ぐ"
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
