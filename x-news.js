window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T23:09:54.703Z",
  "items": [
    {
      "time": "07:36",
      "title": "首相 APECで台湾代表と会談せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603354?source=rss",
      "publishedAt": "2026-11-20T22:36:38.000Z",
      "xQuery": "首相 APECで台湾代表と会談せず"
    },
    {
      "time": "07:30",
      "title": "米株式市場急落 ナスダック5%安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603352?source=rss",
      "publishedAt": "2026-11-20T22:30:18.000Z",
      "xQuery": "米株式市場急落 ナスダック5%安"
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
      "time": "07:51",
      "title": "「リーマン予想」生成AIが証明か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603360?source=rss",
      "publishedAt": "2026-11-20T22:51:15.000Z",
      "xQuery": "「リーマン予想」生成AIが証明か"
    },
    {
      "time": "07:59",
      "title": "久石譲さんに名誉学位 英王立音大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603359?source=rss",
      "publishedAt": "2026-11-20T22:59:10.000Z",
      "xQuery": "久石譲さんに名誉学位 英王立音大"
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
