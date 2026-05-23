window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T10:08:55.591Z",
  "items": [
    {
      "time": "16:50",
      "title": "自民幹事長 ガソリン補助金に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581381?source=rss",
      "publishedAt": "2026-05-23T07:50:38.000Z",
      "xQuery": "自民幹事長 ガソリン補助金に言及"
    },
    {
      "time": "16:12",
      "title": "旧統一総裁 病気で一時釈放長期化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581375?source=rss",
      "publishedAt": "2026-05-23T07:12:38.000Z",
      "xQuery": "旧統一総裁 病気で一時釈放長期化"
    },
    {
      "time": "16:35",
      "title": "トランプ氏 長男の結婚式を欠席へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581379?source=rss",
      "publishedAt": "2026-05-23T07:35:06.000Z",
      "xQuery": "トランプ氏 長男の結婚式を欠席へ"
    },
    {
      "time": "18:03",
      "title": "1-2万円程度のハンディファン続々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581392?source=rss",
      "publishedAt": "2026-05-23T09:03:34.000Z",
      "xQuery": "1-2万円程度のハンディファン続々"
    },
    {
      "time": "17:15",
      "title": "近大生経営ラーメン 売上2千万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581386?source=rss",
      "publishedAt": "2026-05-23T08:15:36.000Z",
      "xQuery": "近大生経営ラーメン 売上2千万円"
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
