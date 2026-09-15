window.LUS_X_NEWS = {
  "updatedAt": "2026-09-15T22:16:09.249Z",
  "items": [
    {
      "time": "06:18",
      "title": "熊本県で震度4 津波の心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595424?source=rss",
      "publishedAt": "2026-09-15T21:18:40.000Z",
      "xQuery": "熊本県で震度4 津波の心配なし"
    },
    {
      "time": "23:33",
      "title": "墜落推定の無人機 空自「任務中」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595421?source=rss",
      "publishedAt": "2026-09-15T14:33:55.000Z",
      "xQuery": "墜落推定の無人機 空自「任務中」"
    },
    {
      "time": "00:08",
      "title": "福岡県議1人20万円夕食会 県負担",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595422?source=rss",
      "publishedAt": "2026-09-15T15:08:36.000Z",
      "xQuery": "福岡県議1人20万円夕食会 県負担"
    },
    {
      "time": "23:00",
      "title": "森衆院議長 ウの議会で異例の演説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595415?source=rss",
      "publishedAt": "2026-09-15T14:00:40.000Z",
      "xQuery": "森衆院議長 ウの議会で異例の演説"
    },
    {
      "time": "06:11",
      "title": "金の延べ棒35kg 兵庫県に匿名寄付",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595423?source=rss",
      "publishedAt": "2026-09-15T21:11:32.000Z",
      "xQuery": "金の延べ棒35kg 兵庫県に匿名寄付"
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
