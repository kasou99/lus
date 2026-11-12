window.LUS_X_NEWS = {
  "updatedAt": "2026-11-12T06:20:08.969Z",
  "items": [
    {
      "time": "14:07",
      "title": "良品計画 破棄すべき情報を保管",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602302?source=rss",
      "publishedAt": "2026-11-12T05:07:26.000Z",
      "xQuery": "良品計画 破棄すべき情報を保管"
    },
    {
      "time": "12:09",
      "title": "ポスト高市の首相再選支持 相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602290?source=rss",
      "publishedAt": "2026-11-12T03:09:55.000Z",
      "xQuery": "ポスト高市の首相再選支持 相次ぐ"
    },
    {
      "time": "11:54",
      "title": "上院選ミシシッピ州 民主勝利確実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602286?source=rss",
      "publishedAt": "2026-11-12T02:54:37.000Z",
      "xQuery": "上院選ミシシッピ州 民主勝利確実"
    },
    {
      "time": "13:38",
      "title": "AIで飲食店の空席検索 3つの懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602281?source=rss",
      "publishedAt": "2026-11-12T04:38:09.000Z",
      "xQuery": "AIで飲食店の空席検索 3つの懸念"
    },
    {
      "time": "12:45",
      "title": "鳥人間で東北大処分 当事者に聞く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602293?source=rss",
      "publishedAt": "2026-11-12T03:45:49.000Z",
      "xQuery": "鳥人間で東北大処分 当事者に聞く"
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
