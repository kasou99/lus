window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T04:38:54.459Z",
  "items": [
    {
      "time": "13:13",
      "title": "熊本・長崎で震度4 津波心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591432?source=rss",
      "publishedAt": "2026-08-12T04:13:25.000Z",
      "xQuery": "熊本・長崎で震度4 津波心配なし"
    },
    {
      "time": "12:14",
      "title": "熱帯低気圧 広い範囲で大雨に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591417?source=rss",
      "publishedAt": "2026-08-12T03:14:49.000Z",
      "xQuery": "熱帯低気圧 広い範囲で大雨に注意"
    },
    {
      "time": "12:47",
      "title": "日本兵と戦わされた 英植民地男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591422?source=rss",
      "publishedAt": "2026-08-12T03:47:00.000Z",
      "xQuery": "日本兵と戦わされた 英植民地男性"
    },
    {
      "time": "12:25",
      "title": "奥田碩さん死去 プリウスに尽力",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591420?source=rss",
      "publishedAt": "2026-08-12T03:25:35.000Z",
      "xQuery": "奥田碩さん死去 プリウスに尽力"
    },
    {
      "time": "12:51",
      "title": "新幹線「独りぼっち席」が話題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591425?source=rss",
      "publishedAt": "2026-08-12T03:51:26.000Z",
      "xQuery": "新幹線「独りぼっち席」が話題"
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
