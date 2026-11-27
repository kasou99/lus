window.LUS_X_NEWS = {
  "updatedAt": "2026-11-27T17:10:22.178Z",
  "items": [
    {
      "time": "23:08",
      "title": "関氏18年食事会で300万円収入計上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604244?source=rss",
      "publishedAt": "2026-11-27T14:08:54.000Z",
      "xQuery": "関氏18年食事会で300万円収入計上"
    },
    {
      "time": "00:15",
      "title": "防衛相ら 献金報道巡り違法性否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604248?source=rss",
      "publishedAt": "2026-11-27T15:15:52.000Z",
      "xQuery": "防衛相ら 献金報道巡り違法性否定"
    },
    {
      "time": "17:37",
      "title": "露指示とされる破壊工作 欧州激化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604208?source=rss",
      "publishedAt": "2026-11-27T08:37:30.000Z",
      "xQuery": "露指示とされる破壊工作 欧州激化"
    },
    {
      "time": "23:27",
      "title": "山中に2遺体 1人は不明の高校生か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604246?source=rss",
      "publishedAt": "2026-11-27T14:27:39.000Z",
      "xQuery": "山中に2遺体 1人は不明の高校生か"
    },
    {
      "time": "22:00",
      "title": "舞妓を狙う観光客の迷惑行為 拍車",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604239?source=rss",
      "publishedAt": "2026-11-27T13:00:25.000Z",
      "xQuery": "舞妓を狙う観光客の迷惑行為 拍車"
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
