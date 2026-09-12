window.LUS_X_NEWS = {
  "updatedAt": "2026-09-12T01:23:12.960Z",
  "items": [
    {
      "time": "09:52",
      "title": "十勝岳 噴火警戒レベル3に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595022?source=rss",
      "publishedAt": "2026-09-12T00:52:04.000Z",
      "xQuery": "十勝岳 噴火警戒レベル3に"
    },
    {
      "time": "09:33",
      "title": "九州～東海で残暑 熱中症対策を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595019?source=rss",
      "publishedAt": "2026-09-12T00:33:11.000Z",
      "xQuery": "九州～東海で残暑 熱中症対策を"
    },
    {
      "time": "09:59",
      "title": "イオン熊本 専門店に契約解除打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595021?source=rss",
      "publishedAt": "2026-09-12T00:59:18.000Z",
      "xQuery": "イオン熊本 専門店に契約解除打診"
    },
    {
      "time": "09:06",
      "title": "北方領土の地図修正巡り 露が反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595015?source=rss",
      "publishedAt": "2026-09-12T00:06:12.000Z",
      "xQuery": "北方領土の地図修正巡り 露が反発"
    },
    {
      "time": "09:21",
      "title": "工藤会と対峙 前・北九州市長語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595017?source=rss",
      "publishedAt": "2026-09-12T00:21:50.000Z",
      "xQuery": "工藤会と対峙 前・北九州市長語る"
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
