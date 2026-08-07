window.LUS_X_NEWS = {
  "updatedAt": "2026-08-07T23:44:23.838Z",
  "items": [
    {
      "time": "07:34",
      "title": "台風13号 沖縄など影響長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590923?source=rss",
      "publishedAt": "2026-08-07T22:34:39.000Z",
      "xQuery": "台風13号 沖縄など影響長引く恐れ"
    },
    {
      "time": "08:00",
      "title": "日本郵便で障害 一部で受け取れず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590928?source=rss",
      "publishedAt": "2026-08-07T23:00:09.000Z",
      "xQuery": "日本郵便で障害 一部で受け取れず"
    },
    {
      "time": "07:26",
      "title": "イオンの従業員誘導 規定に抵触か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590922?source=rss",
      "publishedAt": "2026-08-07T22:26:44.000Z",
      "xQuery": "イオンの従業員誘導 規定に抵触か"
    },
    {
      "time": "22:28",
      "title": "過剰な餌「ウサギの島」に異変",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590912?source=rss",
      "publishedAt": "2026-08-07T13:28:24.000Z",
      "xQuery": "過剰な餌「ウサギの島」に異変"
    },
    {
      "time": "07:49",
      "title": "オープンAI 対話スピーカー発売か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590926?source=rss",
      "publishedAt": "2026-08-07T22:49:12.000Z",
      "xQuery": "オープンAI 対話スピーカー発売か"
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
