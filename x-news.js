window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T10:49:16.709Z",
  "items": [
    {
      "time": "19:35",
      "title": "直近1カ月の為替介入 11.7兆円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582212?source=rss",
      "publishedAt": "2026-05-29T10:35:56.000Z",
      "xQuery": "直近1カ月の為替介入 11.7兆円"
    },
    {
      "time": "19:16",
      "title": "議員ボーナス据え置き 国民に配慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582211?source=rss",
      "publishedAt": "2026-05-29T10:16:49.000Z",
      "xQuery": "議員ボーナス据え置き 国民に配慮"
    },
    {
      "time": "18:57",
      "title": "マイクロバスにはねられ2人重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582208?source=rss",
      "publishedAt": "2026-05-29T09:57:57.000Z",
      "xQuery": "マイクロバスにはねられ2人重体"
    },
    {
      "time": "17:02",
      "title": "年会費無料のクレカ 放置でコスト",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582191?source=rss",
      "publishedAt": "2026-05-29T08:02:39.000Z",
      "xQuery": "年会費無料のクレカ 放置でコスト"
    },
    {
      "time": "18:57",
      "title": "応募数水増し FM東京が社長処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582207?source=rss",
      "publishedAt": "2026-05-29T09:57:09.000Z",
      "xQuery": "応募数水増し FM東京が社長処分"
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
