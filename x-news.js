window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T06:06:47.307Z",
  "items": [
    {
      "time": "14:33",
      "title": "6日にかけ断続的雨 土砂災害警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586697?source=rss",
      "publishedAt": "2026-07-04T05:33:26.000Z",
      "xQuery": "6日にかけ断続的雨 土砂災害警戒"
    },
    {
      "time": "13:33",
      "title": "建国250年 トランプ氏が実績誇示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586690?source=rss",
      "publishedAt": "2026-07-04T04:33:40.000Z",
      "xQuery": "建国250年 トランプ氏が実績誇示"
    },
    {
      "time": "13:30",
      "title": "自宅に遺体を遺棄した疑い 女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586689?source=rss",
      "publishedAt": "2026-07-04T04:30:42.000Z",
      "xQuery": "自宅に遺体を遺棄した疑い 女逮捕"
    },
    {
      "time": "14:17",
      "title": "小6はねたか 殺人未遂疑いで逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586694?source=rss",
      "publishedAt": "2026-07-04T05:17:44.000Z",
      "xQuery": "小6はねたか 殺人未遂疑いで逮捕"
    },
    {
      "time": "12:19",
      "title": "「るるぶ」みたいなカレー ヒット",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586681?source=rss",
      "publishedAt": "2026-07-04T03:19:16.000Z",
      "xQuery": "「るるぶ」みたいなカレー ヒット"
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
