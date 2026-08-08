window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T06:20:52.913Z",
  "items": [
    {
      "time": "15:01",
      "title": "自民党「萩生田幹事長」案が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590982?source=rss",
      "publishedAt": "2026-08-08T06:01:53.000Z",
      "xQuery": "自民党「萩生田幹事長」案が浮上"
    },
    {
      "time": "13:08",
      "title": "大分 被害なしでも旅先変更相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590967?source=rss",
      "publishedAt": "2026-08-08T04:08:46.000Z",
      "xQuery": "大分 被害なしでも旅先変更相次ぐ"
    },
    {
      "time": "13:13",
      "title": "トランプ氏「大統領ビジネス」増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590964?source=rss",
      "publishedAt": "2026-08-08T04:13:15.000Z",
      "xQuery": "トランプ氏「大統領ビジネス」増"
    },
    {
      "time": "14:43",
      "title": "男性2人溺れ1人心肺停止 海水浴場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590979?source=rss",
      "publishedAt": "2026-08-08T05:43:16.000Z",
      "xQuery": "男性2人溺れ1人心肺停止 海水浴場"
    },
    {
      "time": "10:59",
      "title": "高速道で何度も追突され 一部始終",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590948?source=rss",
      "publishedAt": "2026-08-08T01:59:41.000Z",
      "xQuery": "高速道で何度も追突され 一部始終"
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
