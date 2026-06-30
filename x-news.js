window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T07:32:06.191Z",
  "items": [
    {
      "time": "16:16",
      "title": "野党5党「国会正常化」を申し入れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586237?source=rss",
      "publishedAt": "2026-06-30T07:16:27.000Z",
      "xQuery": "野党5党「国会正常化」を申し入れ"
    },
    {
      "time": "14:51",
      "title": "最低賃金1500円先送り 格差の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586229?source=rss",
      "publishedAt": "2026-06-30T05:51:19.000Z",
      "xQuery": "最低賃金1500円先送り 格差の実態"
    },
    {
      "time": "14:51",
      "title": "猟友会の男性 クマに襲われ大けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586230?source=rss",
      "publishedAt": "2026-06-30T05:51:37.000Z",
      "xQuery": "猟友会の男性 クマに襲われ大けが"
    },
    {
      "time": "14:03",
      "title": "アフラック 438万人分の情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586227?source=rss",
      "publishedAt": "2026-06-30T05:03:20.000Z",
      "xQuery": "アフラック 438万人分の情報流出"
    },
    {
      "time": "16:26",
      "title": "iPhone18Proの機密情報流出 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586236?source=rss",
      "publishedAt": "2026-06-30T07:26:37.000Z",
      "xQuery": "iPhone18Proの機密情報流出 報道"
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
