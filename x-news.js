window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T14:18:18.516Z",
  "items": [
    {
      "time": "21:05",
      "title": "国会の正常化 来週以降に持ち越し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586625?source=rss",
      "publishedAt": "2026-07-03T12:05:52.000Z",
      "xQuery": "国会の正常化 来週以降に持ち越し"
    },
    {
      "time": "22:25",
      "title": "トヨタ自動車 株主数が5年で2.5倍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586631?source=rss",
      "publishedAt": "2026-07-03T13:25:15.000Z",
      "xQuery": "トヨタ自動車 株主数が5年で2.5倍"
    },
    {
      "time": "22:57",
      "title": "「案件屋」を初めて逮捕 警視庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586636?source=rss",
      "publishedAt": "2026-07-03T13:57:12.000Z",
      "xQuery": "「案件屋」を初めて逮捕 警視庁"
    },
    {
      "time": "22:12",
      "title": "サバ入り箱崩れ下敷き 作業員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586629?source=rss",
      "publishedAt": "2026-07-03T13:12:35.000Z",
      "xQuery": "サバ入り箱崩れ下敷き 作業員死亡"
    },
    {
      "time": "22:39",
      "title": "サーティワン×どう森 品切れ謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586633?source=rss",
      "publishedAt": "2026-07-03T13:39:09.000Z",
      "xQuery": "サーティワン×どう森 品切れ謝罪"
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
