window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T05:18:25.002Z",
  "items": [
    {
      "time": "11:49",
      "title": "トランプ氏が円安けん制 会談で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596467?source=rss",
      "publishedAt": "2026-09-25T02:49:28.000Z",
      "xQuery": "トランプ氏が円安けん制 会談で"
    },
    {
      "time": "12:41",
      "title": "10/2頃まで 雨の日多くなる予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596473?source=rss",
      "publishedAt": "2026-09-25T03:41:21.000Z",
      "xQuery": "10/2頃まで 雨の日多くなる予想"
    },
    {
      "time": "13:34",
      "title": "印旛沼の決壊堤防 緊急復旧に着手",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596477?source=rss",
      "publishedAt": "2026-09-25T04:34:55.000Z",
      "xQuery": "印旛沼の決壊堤防 緊急復旧に着手"
    },
    {
      "time": "12:54",
      "title": "配達先で少女にわいせつ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596474?source=rss",
      "publishedAt": "2026-09-25T03:54:19.000Z",
      "xQuery": "配達先で少女にわいせつ疑い 逮捕"
    },
    {
      "time": "13:55",
      "title": "熱帯性ウミガメ 米加州海岸で産卵",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596480?source=rss",
      "publishedAt": "2026-09-25T04:55:09.000Z",
      "xQuery": "熱帯性ウミガメ 米加州海岸で産卵"
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
