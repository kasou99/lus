window.LUS_X_NEWS = {
  "updatedAt": "2026-11-28T04:12:55.238Z",
  "items": [
    {
      "time": "08:53",
      "title": "基礎控除上乗せ見直し 先送り方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604266?source=rss",
      "publishedAt": "2026-11-27T23:53:48.000Z",
      "xQuery": "基礎控除上乗せ見直し 先送り方針"
    },
    {
      "time": "11:06",
      "title": "男女7人けが 襲ったイノシシ駆除",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604280?source=rss",
      "publishedAt": "2026-11-28T02:06:09.000Z",
      "xQuery": "男女7人けが 襲ったイノシシ駆除"
    },
    {
      "time": "12:53",
      "title": "生徒誘拐疑いの男 ネットで接点か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604287?source=rss",
      "publishedAt": "2026-11-28T03:53:24.000Z",
      "xQuery": "生徒誘拐疑いの男 ネットで接点か"
    },
    {
      "time": "10:00",
      "title": "鎌田大地選手を英国で起訴 英報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604273?source=rss",
      "publishedAt": "2026-11-28T01:00:59.000Z",
      "xQuery": "鎌田大地選手を英国で起訴 英報道"
    },
    {
      "time": "10:44",
      "title": "大人紙おむつ ごみ処理悩む自治体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604278?source=rss",
      "publishedAt": "2026-11-28T01:44:12.000Z",
      "xQuery": "大人紙おむつ ごみ処理悩む自治体"
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
