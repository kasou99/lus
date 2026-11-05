window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T10:35:43.145Z",
  "items": [
    {
      "time": "17:01",
      "title": "米右派動揺「トランプ後」を模索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601435?source=rss",
      "publishedAt": "2026-11-05T08:01:55.000Z",
      "xQuery": "米右派動揺「トランプ後」を模索"
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
      "time": "18:14",
      "title": "映画監督の榊英雄被告 実刑確定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601450?source=rss",
      "publishedAt": "2026-11-05T09:14:17.000Z",
      "xQuery": "映画監督の榊英雄被告 実刑確定へ"
    },
    {
      "time": "18:41",
      "title": "10月就任の横浜市長が療養 過労か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601452?source=rss",
      "publishedAt": "2026-11-05T09:41:26.000Z",
      "xQuery": "10月就任の横浜市長が療養 過労か"
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
