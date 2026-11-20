window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T17:08:52.709Z",
  "items": [
    {
      "time": "21:31",
      "title": "安保3文書素案 原潜「検討着手」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603335?source=rss",
      "publishedAt": "2026-11-20T12:31:19.000Z",
      "xQuery": "安保3文書素案 原潜「検討着手」"
    },
    {
      "time": "23:58",
      "title": "EV補助金受け付け終了 予算枯渇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603347?source=rss",
      "publishedAt": "2026-11-20T14:58:48.000Z",
      "xQuery": "EV補助金受け付け終了 予算枯渇"
    },
    {
      "time": "00:11",
      "title": "官僚参加パーティー5件に 文科相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603350?source=rss",
      "publishedAt": "2026-11-20T15:11:22.000Z",
      "xQuery": "官僚参加パーティー5件に 文科相"
    },
    {
      "time": "22:42",
      "title": "ポーランドにミサイル 被害なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603345?source=rss",
      "publishedAt": "2026-11-20T13:42:05.000Z",
      "xQuery": "ポーランドにミサイル 被害なし"
    },
    {
      "time": "21:32",
      "title": "サウジ原油 日本での備蓄3倍合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603336?source=rss",
      "publishedAt": "2026-11-20T12:32:05.000Z",
      "xQuery": "サウジ原油 日本での備蓄3倍合意"
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
