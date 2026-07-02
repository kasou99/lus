window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T05:26:05.296Z",
  "items": [
    {
      "time": "12:37",
      "title": "2025年度の税収84兆円超 過去最高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586450?source=rss",
      "publishedAt": "2026-07-02T03:37:45.000Z",
      "xQuery": "2025年度の税収84兆円超 過去最高"
    },
    {
      "time": "12:59",
      "title": "九州で北部中心に大雨 被害相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586453?source=rss",
      "publishedAt": "2026-07-02T03:59:06.000Z",
      "xQuery": "九州で北部中心に大雨 被害相次ぐ"
    },
    {
      "time": "12:53",
      "title": "「内密出産」1年で7人 賛育会病院",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586448?source=rss",
      "publishedAt": "2026-07-02T03:53:55.000Z",
      "xQuery": "「内密出産」1年で7人 賛育会病院"
    },
    {
      "time": "14:02",
      "title": "現金給付にマイナ活用 政府整備へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586462?source=rss",
      "publishedAt": "2026-07-02T05:02:51.000Z",
      "xQuery": "現金給付にマイナ活用 政府整備へ"
    },
    {
      "time": "13:46",
      "title": "苦境に立つ自販機ビジネス 背景は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586459?source=rss",
      "publishedAt": "2026-07-02T04:46:41.000Z",
      "xQuery": "苦境に立つ自販機ビジネス 背景は"
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
