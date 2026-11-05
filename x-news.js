window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T09:13:01.988Z",
  "items": [
    {
      "time": "16:51",
      "title": "米共和党大敗 宣伝頼り示した限界",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601411?source=rss",
      "publishedAt": "2026-11-05T07:51:59.000Z",
      "xQuery": "米共和党大敗 宣伝頼り示した限界"
    },
    {
      "time": "17:12",
      "title": "サイバー攻撃 10月は国内4億件超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601439?source=rss",
      "publishedAt": "2026-11-05T08:12:32.000Z",
      "xQuery": "サイバー攻撃 10月は国内4億件超"
    },
    {
      "time": "16:35",
      "title": "ドコモ障害「5G SA」のみで発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601432?source=rss",
      "publishedAt": "2026-11-05T07:35:19.000Z",
      "xQuery": "ドコモ障害「5G SA」のみで発生"
    },
    {
      "time": "17:21",
      "title": "改姓巡り婚約解消 訴えた女性敗訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601441?source=rss",
      "publishedAt": "2026-11-05T08:21:21.000Z",
      "xQuery": "改姓巡り婚約解消 訴えた女性敗訴"
    },
    {
      "time": "17:29",
      "title": "シヤチハタ 化粧品事業に参入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601444?source=rss",
      "publishedAt": "2026-11-05T08:29:19.000Z",
      "xQuery": "シヤチハタ 化粧品事業に参入へ"
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
