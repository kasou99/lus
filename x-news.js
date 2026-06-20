window.LUS_X_NEWS = {
  "updatedAt": "2026-06-20T13:04:27.283Z",
  "items": [
    {
      "time": "21:04",
      "title": "攻撃受けたモスクワ 混乱広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585004?source=rss",
      "publishedAt": "2026-06-20T12:04:44.000Z",
      "xQuery": "攻撃受けたモスクワ 混乱広がる"
    },
    {
      "time": "21:35",
      "title": "北朝鮮ミサイル 精度向上とウ当局",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585005?source=rss",
      "publishedAt": "2026-06-20T12:35:12.000Z",
      "xQuery": "北朝鮮ミサイル 精度向上とウ当局"
    },
    {
      "time": "21:44",
      "title": "動物の血を人に 日中戦争時実験か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585013?source=rss",
      "publishedAt": "2026-06-20T12:44:34.000Z",
      "xQuery": "動物の血を人に 日中戦争時実験か"
    },
    {
      "time": "21:50",
      "title": "八田容疑者の逮捕を諦めない 遺族",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585014?source=rss",
      "publishedAt": "2026-06-20T12:50:46.000Z",
      "xQuery": "八田容疑者の逮捕を諦めない 遺族"
    },
    {
      "time": "21:43",
      "title": "マンションで損壊された遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585012?source=rss",
      "publishedAt": "2026-06-20T12:43:01.000Z",
      "xQuery": "マンションで損壊された遺体発見"
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
