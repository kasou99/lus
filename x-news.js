window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T06:37:58.788Z",
  "items": [
    {
      "time": "13:29",
      "title": "露大統領の択捉島訪問 茂木氏抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591572?source=rss",
      "publishedAt": "2026-08-13T04:29:51.000Z",
      "xQuery": "露大統領の択捉島訪問 茂木氏抗議"
    },
    {
      "time": "12:55",
      "title": "秋篠宮さま 皇室典範巡りコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591564?source=rss",
      "publishedAt": "2026-08-13T03:55:31.000Z",
      "xQuery": "秋篠宮さま 皇室典範巡りコメント"
    },
    {
      "time": "13:58",
      "title": "闇バイト応募で渡米 邦人男性保護",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591577?source=rss",
      "publishedAt": "2026-08-13T04:58:58.000Z",
      "xQuery": "闇バイト応募で渡米 邦人男性保護"
    },
    {
      "time": "14:57",
      "title": "泳いで母を助けに 18歳遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591581?source=rss",
      "publishedAt": "2026-08-13T05:57:21.000Z",
      "xQuery": "泳いで母を助けに 18歳遺体で発見"
    },
    {
      "time": "13:40",
      "title": "芸能プロの佐藤企画 破産開始決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591573?source=rss",
      "publishedAt": "2026-08-13T04:40:47.000Z",
      "xQuery": "芸能プロの佐藤企画 破産開始決定"
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
