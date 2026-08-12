window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T12:23:12.267Z",
  "items": [
    {
      "time": "17:43",
      "title": "中道の総支部解散が相次ぐ 30超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591468?source=rss",
      "publishedAt": "2026-08-12T08:43:36.000Z",
      "xQuery": "中道の総支部解散が相次ぐ 30超"
    },
    {
      "time": "19:42",
      "title": "朱鎔基・元中国首相が死去 97歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591481?source=rss",
      "publishedAt": "2026-08-12T10:42:36.000Z",
      "xQuery": "朱鎔基・元中国首相が死去 97歳"
    },
    {
      "time": "20:37",
      "title": "イオン爆発 ハビタが「補償模索」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591485?source=rss",
      "publishedAt": "2026-08-12T11:37:21.000Z",
      "xQuery": "イオン爆発 ハビタが「補償模索」"
    },
    {
      "time": "17:27",
      "title": "砂浜に遺体 不明の22歳男性と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591465?source=rss",
      "publishedAt": "2026-08-12T08:27:36.000Z",
      "xQuery": "砂浜に遺体 不明の22歳男性と判明"
    },
    {
      "time": "19:53",
      "title": "新幹線乗り遅れ緊急停止 動画拡散",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591482?source=rss",
      "publishedAt": "2026-08-12T10:53:11.000Z",
      "xQuery": "新幹線乗り遅れ緊急停止 動画拡散"
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
