window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T22:22:18.767Z",
  "items": [
    {
      "time": "21:47",
      "title": "猛暑日予想 週明け熊本は40℃恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590190?source=rss",
      "publishedAt": "2026-08-01T12:47:46.000Z",
      "xQuery": "猛暑日予想 週明け熊本は40℃恐れ"
    },
    {
      "time": "23:03",
      "title": "り災証明の申請 片付け前に撮影を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590195?source=rss",
      "publishedAt": "2026-08-01T14:03:13.000Z",
      "xQuery": "り災証明の申請 片付け前に撮影を"
    },
    {
      "time": "22:44",
      "title": "日米両政府 円安是正の方針表明へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590196?source=rss",
      "publishedAt": "2026-08-01T13:44:35.000Z",
      "xQuery": "日米両政府 円安是正の方針表明へ"
    },
    {
      "time": "19:49",
      "title": "2歳が行方不明 祖母の家に帰省中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590182?source=rss",
      "publishedAt": "2026-08-01T10:49:40.000Z",
      "xQuery": "2歳が行方不明 祖母の家に帰省中"
    },
    {
      "time": "22:22",
      "title": "著名登山家死亡 パキスタンで雪崩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590194?source=rss",
      "publishedAt": "2026-08-01T13:22:35.000Z",
      "xQuery": "著名登山家死亡 パキスタンで雪崩"
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
