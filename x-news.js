window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T03:13:42.950Z",
  "items": [
    {
      "time": "11:33",
      "title": "台風警戒 沖縄で長時間暴風の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587393?source=rss",
      "publishedAt": "2026-07-10T02:33:50.000Z",
      "xQuery": "台風警戒 沖縄で長時間暴風の恐れ"
    },
    {
      "time": "10:27",
      "title": "「国旗損壊罪」案 対象なお不明確",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587390?source=rss",
      "publishedAt": "2026-07-10T01:27:19.000Z",
      "xQuery": "「国旗損壊罪」案 対象なお不明確"
    },
    {
      "time": "11:37",
      "title": "イラン トランプ氏の暗殺を計画か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587394?source=rss",
      "publishedAt": "2026-07-10T02:37:27.000Z",
      "xQuery": "イラン トランプ氏の暗殺を計画か"
    },
    {
      "time": "12:07",
      "title": "マンション下がけ崩れ 監視続ける",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587400?source=rss",
      "publishedAt": "2026-07-10T03:07:54.000Z",
      "xQuery": "マンション下がけ崩れ 監視続ける"
    },
    {
      "time": "10:38",
      "title": "児童ら15人がハチに刺される 搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587391?source=rss",
      "publishedAt": "2026-07-10T01:38:20.000Z",
      "xQuery": "児童ら15人がハチに刺される 搬送"
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
