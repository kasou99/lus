window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T23:07:14.887Z",
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
      "time": "07:41",
      "title": "処理水放出3年 タンク貯蔵量7%減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592831?source=rss",
      "publishedAt": "2026-08-23T22:41:33.000Z",
      "xQuery": "処理水放出3年 タンク貯蔵量7%減"
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
    },
    {
      "time": "07:34",
      "title": "協議離婚サポート 家事ADRに注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592830?source=rss",
      "publishedAt": "2026-08-23T22:34:49.000Z",
      "xQuery": "協議離婚サポート 家事ADRに注目"
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
