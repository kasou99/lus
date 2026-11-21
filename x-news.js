window.LUS_X_NEWS = {
  "updatedAt": "2026-11-21T02:14:57.304Z",
  "items": [
    {
      "time": "08:46",
      "title": "首相中国到着時の段差 木原氏説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603366?source=rss",
      "publishedAt": "2026-11-20T23:46:23.000Z",
      "xQuery": "首相中国到着時の段差 木原氏説明"
    },
    {
      "time": "10:04",
      "title": "正恩氏 トランプ氏本気度に疑心か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603378?source=rss",
      "publishedAt": "2026-11-21T01:04:25.000Z",
      "xQuery": "正恩氏 トランプ氏本気度に疑心か"
    },
    {
      "time": "10:04",
      "title": "ミサイル落下 ポーランドが露非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603377?source=rss",
      "publishedAt": "2026-11-21T01:04:45.000Z",
      "xQuery": "ミサイル落下 ポーランドが露非難"
    },
    {
      "time": "10:20",
      "title": "大型物流倉庫で火事 三郷JCT付近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603380?source=rss",
      "publishedAt": "2026-11-21T01:20:54.000Z",
      "xQuery": "大型物流倉庫で火事 三郷JCT付近"
    },
    {
      "time": "10:20",
      "title": "なぜ実家暮らし 40代未婚者の答え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603379?source=rss",
      "publishedAt": "2026-11-21T01:20:54.000Z",
      "xQuery": "なぜ実家暮らし 40代未婚者の答え"
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
