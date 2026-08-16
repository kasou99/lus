window.LUS_X_NEWS = {
  "updatedAt": "2026-08-16T04:16:33.380Z",
  "items": [
    {
      "time": "12:22",
      "title": "お盆休み最終日 交通混雑がピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591931?source=rss",
      "publishedAt": "2026-08-16T03:22:01.000Z",
      "xQuery": "お盆休み最終日 交通混雑がピーク"
    },
    {
      "time": "11:14",
      "title": "米金融 新顔「ヨール街」に存在感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591924?source=rss",
      "publishedAt": "2026-08-16T02:14:02.000Z",
      "xQuery": "米金融 新顔「ヨール街」に存在感"
    },
    {
      "time": "11:39",
      "title": "首相異例の遥拝 保守層離反を警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591925?source=rss",
      "publishedAt": "2026-08-16T02:39:24.000Z",
      "xQuery": "首相異例の遥拝 保守層離反を警戒"
    },
    {
      "time": "11:08",
      "title": "飼い犬殺害 裁判官が証言に苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591923?source=rss",
      "publishedAt": "2026-08-16T02:08:43.000Z",
      "xQuery": "飼い犬殺害 裁判官が証言に苦言"
    },
    {
      "time": "11:55",
      "title": "プロテイン 価格の高騰止まらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591929?source=rss",
      "publishedAt": "2026-08-16T02:55:48.000Z",
      "xQuery": "プロテイン 価格の高騰止まらず"
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
