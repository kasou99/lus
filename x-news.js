window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T22:40:32.791Z",
  "items": [
    {
      "time": "07:31",
      "title": "全国で厳しい暑さ 天気急変も注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592828?source=rss",
      "publishedAt": "2026-08-23T22:31:23.000Z",
      "xQuery": "全国で厳しい暑さ 天気急変も注意"
    },
    {
      "time": "06:29",
      "title": "消費減税巡り財政に不安71% 共同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592823?source=rss",
      "publishedAt": "2026-08-23T21:29:41.000Z",
      "xQuery": "消費減税巡り財政に不安71% 共同"
    },
    {
      "time": "21:24",
      "title": "豪雨で愛車失った人たち 悲痛な声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592807?source=rss",
      "publishedAt": "2026-08-23T12:24:38.000Z",
      "xQuery": "豪雨で愛車失った人たち 悲痛な声"
    },
    {
      "time": "06:45",
      "title": "車と衝突 バイクの18歳高校生死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592824?source=rss",
      "publishedAt": "2026-08-23T21:45:25.000Z",
      "xQuery": "車と衝突 バイクの18歳高校生死亡"
    },
    {
      "time": "07:07",
      "title": "水上バイクによる事故 後を絶たず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592825?source=rss",
      "publishedAt": "2026-08-23T22:07:43.000Z",
      "xQuery": "水上バイクによる事故 後を絶たず"
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
