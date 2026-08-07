window.LUS_X_NEWS = {
  "updatedAt": "2026-08-07T00:57:42.506Z",
  "items": [
    {
      "time": "07:58",
      "title": "女性研究者支援 新制度設ける方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590820?source=rss",
      "publishedAt": "2026-08-06T22:58:11.000Z",
      "xQuery": "女性研究者支援 新制度設ける方針"
    },
    {
      "time": "07:48",
      "title": "秋田にAIデータセンター建設へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590818?source=rss",
      "publishedAt": "2026-08-06T22:48:51.000Z",
      "xQuery": "秋田にAIデータセンター建設へ"
    },
    {
      "time": "08:09",
      "title": "イオン爆発遺族 本当のこと言って",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590821?source=rss",
      "publishedAt": "2026-08-06T23:09:41.000Z",
      "xQuery": "イオン爆発遺族 本当のこと言って"
    },
    {
      "time": "07:31",
      "title": "バイクと複数車絡む事故 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590814?source=rss",
      "publishedAt": "2026-08-06T22:31:59.000Z",
      "xQuery": "バイクと複数車絡む事故 男性死亡"
    },
    {
      "time": "09:26",
      "title": "月のロケット残骸衝突跡 画像公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590828?source=rss",
      "publishedAt": "2026-08-07T00:26:46.000Z",
      "xQuery": "月のロケット残骸衝突跡 画像公開"
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
