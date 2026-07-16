window.LUS_X_NEWS = {
  "updatedAt": "2026-07-16T13:37:21.740Z",
  "items": [
    {
      "time": "22:17",
      "title": "熱中症で127人救急搬送 東京",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588190?source=rss",
      "publishedAt": "2026-07-16T13:17:04.000Z",
      "xQuery": "熱中症で127人救急搬送 東京"
    },
    {
      "time": "22:25",
      "title": "水難事故相次ぐ 10代2人意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588192?source=rss",
      "publishedAt": "2026-07-16T13:25:49.000Z",
      "xQuery": "水難事故相次ぐ 10代2人意識不明"
    },
    {
      "time": "22:08",
      "title": "アエラホーム 民事再生法を申請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588189?source=rss",
      "publishedAt": "2026-07-16T13:08:07.000Z",
      "xQuery": "アエラホーム 民事再生法を申請"
    },
    {
      "time": "21:37",
      "title": "米兵の男性ホルモン毎年検査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588187?source=rss",
      "publishedAt": "2026-07-16T12:37:10.000Z",
      "xQuery": "米兵の男性ホルモン毎年検査へ"
    },
    {
      "time": "22:32",
      "title": "書籍に差別的表現 双葉社が回収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588195?source=rss",
      "publishedAt": "2026-07-16T13:32:12.000Z",
      "xQuery": "書籍に差別的表現 双葉社が回収"
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
