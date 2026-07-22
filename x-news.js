window.LUS_X_NEWS = {
  "updatedAt": "2026-07-22T21:06:54.144Z",
  "items": [
    {
      "time": "23:10",
      "title": "米国務長官 日中関係の悪化に憂慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588959?source=rss",
      "publishedAt": "2026-07-22T14:10:40.000Z",
      "xQuery": "米国務長官 日中関係の悪化に憂慮"
    },
    {
      "time": "23:11",
      "title": "ウ軍 露通販大手の倉庫を再び攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588957?source=rss",
      "publishedAt": "2026-07-22T14:11:36.000Z",
      "xQuery": "ウ軍 露通販大手の倉庫を再び攻撃"
    },
    {
      "time": "21:24",
      "title": "ソウル市長に有罪 刑確定なら失職",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588946?source=rss",
      "publishedAt": "2026-07-22T12:24:33.000Z",
      "xQuery": "ソウル市長に有罪 刑確定なら失職"
    },
    {
      "time": "22:03",
      "title": "刃物持つ男 警察官の発砲受け負傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588951?source=rss",
      "publishedAt": "2026-07-22T13:03:52.000Z",
      "xQuery": "刃物持つ男 警察官の発砲受け負傷"
    },
    {
      "time": "23:34",
      "title": "離島専門に引っ越し業 年商8億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588960?source=rss",
      "publishedAt": "2026-07-22T14:34:58.000Z",
      "xQuery": "離島専門に引っ越し業 年商8億円"
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
