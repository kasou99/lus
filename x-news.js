window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T22:49:24.522Z",
  "items": [
    {
      "time": "21:57",
      "title": "連休最終日は猛暑日エリア拡大か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588559?source=rss",
      "publishedAt": "2026-07-19T12:57:25.000Z",
      "xQuery": "連休最終日は猛暑日エリア拡大か"
    },
    {
      "time": "22:01",
      "title": "日比海洋交渉入り合意 中国猛反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588562?source=rss",
      "publishedAt": "2026-07-19T13:01:32.000Z",
      "xQuery": "日比海洋交渉入り合意 中国猛反発"
    },
    {
      "time": "07:16",
      "title": "正面衝突で2人死亡1人重体 逆走か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588578?source=rss",
      "publishedAt": "2026-07-19T22:16:27.000Z",
      "xQuery": "正面衝突で2人死亡1人重体 逆走か"
    },
    {
      "time": "21:59",
      "title": "闇バイト投稿に警告7万件超 25年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588560?source=rss",
      "publishedAt": "2026-07-19T12:59:38.000Z",
      "xQuery": "闇バイト投稿に警告7万件超 25年"
    },
    {
      "time": "23:41",
      "title": "老舗酒造会社「越後鶴亀」全焼か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588573?source=rss",
      "publishedAt": "2026-07-19T14:41:18.000Z",
      "xQuery": "老舗酒造会社「越後鶴亀」全焼か"
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
