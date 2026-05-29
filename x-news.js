window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T01:15:30.272Z",
  "items": [
    {
      "time": "08:42",
      "title": "日本の人口309万人減 減少幅最大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582118?source=rss",
      "publishedAt": "2026-05-28T23:42:35.000Z",
      "xQuery": "日本の人口309万人減 減少幅最大"
    },
    {
      "time": "08:03",
      "title": "現存建物の2割超が未登記 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582113?source=rss",
      "publishedAt": "2026-05-28T23:03:12.000Z",
      "xQuery": "現存建物の2割超が未登記 調査"
    },
    {
      "time": "09:53",
      "title": "露の批判「ばかげている」日本",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582129?source=rss",
      "publishedAt": "2026-05-29T00:53:09.000Z",
      "xQuery": "露の批判「ばかげている」日本"
    },
    {
      "time": "08:28",
      "title": "助手席窓から顔出し壁に衝突 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582117?source=rss",
      "publishedAt": "2026-05-28T23:28:24.000Z",
      "xQuery": "助手席窓から顔出し壁に衝突 死亡"
    },
    {
      "time": "09:50",
      "title": "東京メトロ銀座線 全線で運転再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582130?source=rss",
      "publishedAt": "2026-05-29T00:50:28.000Z",
      "xQuery": "東京メトロ銀座線 全線で運転再開"
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
