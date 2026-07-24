window.LUS_X_NEWS = {
  "updatedAt": "2026-07-24T09:19:17.372Z",
  "items": [
    {
      "time": "16:56",
      "title": "副首都法案 与野党駆け引き大詰め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589154?source=rss",
      "publishedAt": "2026-07-24T07:56:13.000Z",
      "xQuery": "副首都法案 与野党駆け引き大詰め"
    },
    {
      "time": "16:52",
      "title": "世銀 中国への融資を段階的に廃止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589149?source=rss",
      "publishedAt": "2026-07-24T07:52:42.000Z",
      "xQuery": "世銀 中国への融資を段階的に廃止"
    },
    {
      "time": "17:30",
      "title": "都内で大雨 現地からのSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589160?source=rss",
      "publishedAt": "2026-07-24T08:30:25.000Z",
      "xQuery": "都内で大雨 現地からのSNS投稿"
    },
    {
      "time": "16:41",
      "title": "川の遺体 不明の5歳男児と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589155?source=rss",
      "publishedAt": "2026-07-24T07:41:59.000Z",
      "xQuery": "川の遺体 不明の5歳男児と判明"
    },
    {
      "time": "18:00",
      "title": "「私かも」児童ひき逃げ巡り出頭",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589166?source=rss",
      "publishedAt": "2026-07-24T09:00:29.000Z",
      "xQuery": "「私かも」児童ひき逃げ巡り出頭"
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
