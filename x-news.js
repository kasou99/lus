window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T19:39:35.861Z",
  "items": [
    {
      "time": "23:41",
      "title": "22日 西・東日本は急な雷雨に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592596?source=rss",
      "publishedAt": "2026-08-21T14:41:55.000Z",
      "xQuery": "22日 西・東日本は急な雷雨に注意"
    },
    {
      "time": "21:54",
      "title": "埼玉で猛烈な雨 車水没訴える通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592589?source=rss",
      "publishedAt": "2026-08-21T12:54:28.000Z",
      "xQuery": "埼玉で猛烈な雨 車水没訴える通報"
    },
    {
      "time": "21:33",
      "title": "赤根所長へ連帯表明の国が相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592587?source=rss",
      "publishedAt": "2026-08-21T12:33:12.000Z",
      "xQuery": "赤根所長へ連帯表明の国が相次ぐ"
    },
    {
      "time": "22:26",
      "title": "5人殺害事件遺族 死刑執行に心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592590?source=rss",
      "publishedAt": "2026-08-21T13:26:54.000Z",
      "xQuery": "5人殺害事件遺族 死刑執行に心境"
    },
    {
      "time": "23:24",
      "title": "劇物を摂取させ殺人未遂疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592595?source=rss",
      "publishedAt": "2026-08-21T14:24:47.000Z",
      "xQuery": "劇物を摂取させ殺人未遂疑い 逮捕"
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
