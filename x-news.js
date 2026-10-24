window.LUS_X_NEWS = {
  "updatedAt": "2026-10-24T11:38:09.727Z",
  "items": [
    {
      "time": "18:26",
      "title": "西・東日本 台風接近前から雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599957?source=rss",
      "publishedAt": "2026-10-24T09:26:08.000Z",
      "xQuery": "西・東日本 台風接近前から雨警戒"
    },
    {
      "time": "20:12",
      "title": "自殺予防にAI 厚労省が効果検証へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599967?source=rss",
      "publishedAt": "2026-10-24T11:12:10.000Z",
      "xQuery": "自殺予防にAI 厚労省が効果検証へ"
    },
    {
      "time": "19:05",
      "title": "アジアパラ 日本勢はメダル186個",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599962?source=rss",
      "publishedAt": "2026-10-24T10:05:15.000Z",
      "xQuery": "アジアパラ 日本勢はメダル186個"
    },
    {
      "time": "19:26",
      "title": "車が電柱に衝突 同乗の6歳重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599965?source=rss",
      "publishedAt": "2026-10-24T10:26:44.000Z",
      "xQuery": "車が電柱に衝突 同乗の6歳重体"
    },
    {
      "time": "19:08",
      "title": "リニア地下ホーム工事現場 初公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599964?source=rss",
      "publishedAt": "2026-10-24T10:08:00.000Z",
      "xQuery": "リニア地下ホーム工事現場 初公開"
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
