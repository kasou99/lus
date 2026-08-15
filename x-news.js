window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T06:48:01.537Z",
  "items": [
    {
      "time": "14:49",
      "title": "関東-近畿で局地的に雨雲 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591818?source=rss",
      "publishedAt": "2026-08-15T05:49:56.000Z",
      "xQuery": "関東-近畿で局地的に雨雲 警戒を"
    },
    {
      "time": "14:56",
      "title": "減税と給付 法案一本化へ政府調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591819?source=rss",
      "publishedAt": "2026-08-15T05:56:19.000Z",
      "xQuery": "減税と給付 法案一本化へ政府調整"
    },
    {
      "time": "14:06",
      "title": "車水没 保険適用のためすべきこと",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591810?source=rss",
      "publishedAt": "2026-08-15T05:06:44.000Z",
      "xQuery": "車水没 保険適用のためすべきこと"
    },
    {
      "time": "15:42",
      "title": "海に流された子2人助けに 父死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591826?source=rss",
      "publishedAt": "2026-08-15T06:42:48.000Z",
      "xQuery": "海に流された子2人助けに 父死亡"
    },
    {
      "time": "15:12",
      "title": "自分やゆする元東大生 人生の誤算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591822?source=rss",
      "publishedAt": "2026-08-15T06:12:45.000Z",
      "xQuery": "自分やゆする元東大生 人生の誤算"
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
