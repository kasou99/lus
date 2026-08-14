window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T06:36:58.356Z",
  "items": [
    {
      "time": "14:56",
      "title": "千葉豪雨7人死亡 1人が行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591693?source=rss",
      "publishedAt": "2026-08-14T05:56:46.000Z",
      "xQuery": "千葉豪雨7人死亡 1人が行方不明"
    },
    {
      "time": "13:40",
      "title": "午後も関東は大雨恐れ 厳重警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591687?source=rss",
      "publishedAt": "2026-08-14T04:40:46.000Z",
      "xQuery": "午後も関東は大雨恐れ 厳重警戒を"
    },
    {
      "time": "14:44",
      "title": "千葉県 記録的な豪雨となった理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591692?source=rss",
      "publishedAt": "2026-08-14T05:44:26.000Z",
      "xQuery": "千葉県 記録的な豪雨となった理由"
    },
    {
      "time": "14:10",
      "title": "帰りたい 豪雨で帰宅困難者が続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591689?source=rss",
      "publishedAt": "2026-08-14T05:10:23.000Z",
      "xQuery": "帰りたい 豪雨で帰宅困難者が続出"
    },
    {
      "time": "13:53",
      "title": "虫歯20本 デンタルネグレクト実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591688?source=rss",
      "publishedAt": "2026-08-14T04:53:15.000Z",
      "xQuery": "虫歯20本 デンタルネグレクト実態"
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
