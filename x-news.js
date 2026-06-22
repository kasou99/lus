window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T11:06:21.215Z",
  "items": [
    {
      "time": "18:43",
      "title": "米イラン対面協議 先行きは不透明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585236?source=rss",
      "publishedAt": "2026-06-22T09:43:10.000Z",
      "xQuery": "米イラン対面協議 先行きは不透明"
    },
    {
      "time": "19:02",
      "title": "99年主婦殺害 なぜ夫は損賠求める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585243?source=rss",
      "publishedAt": "2026-06-22T10:02:29.000Z",
      "xQuery": "99年主婦殺害 なぜ夫は損賠求める"
    },
    {
      "time": "19:07",
      "title": "内田被告の実行行為 裁判所認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585242?source=rss",
      "publishedAt": "2026-06-22T10:07:10.000Z",
      "xQuery": "内田被告の実行行為 裁判所認める"
    },
    {
      "time": "19:33",
      "title": "温泉施設5歳不明 父悲痛な胸の内",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585249?source=rss",
      "publishedAt": "2026-06-22T10:33:59.000Z",
      "xQuery": "温泉施設5歳不明 父悲痛な胸の内"
    },
    {
      "time": "19:28",
      "title": "上半身露出で健診 川崎市立の2校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585246?source=rss",
      "publishedAt": "2026-06-22T10:28:20.000Z",
      "xQuery": "上半身露出で健診 川崎市立の2校"
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
