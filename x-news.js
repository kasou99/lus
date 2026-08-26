window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T07:21:38.895Z",
  "items": [
    {
      "time": "14:14",
      "title": "博多区で40.4℃ 福岡市初の酷暑日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593134?source=rss",
      "publishedAt": "2026-08-26T05:14:42.000Z",
      "xQuery": "博多区で40.4℃ 福岡市初の酷暑日"
    },
    {
      "time": "15:42",
      "title": "石川に修学旅行 前年度から5割増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593140?source=rss",
      "publishedAt": "2026-08-26T06:42:12.000Z",
      "xQuery": "石川に修学旅行 前年度から5割増"
    },
    {
      "time": "14:54",
      "title": "富士山で遭難激増 シャリバテとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593135?source=rss",
      "publishedAt": "2026-08-26T05:54:10.000Z",
      "xQuery": "富士山で遭難激増 シャリバテとは"
    },
    {
      "time": "15:01",
      "title": "女子ばかり行列 学校トイレ巡る声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593138?source=rss",
      "publishedAt": "2026-08-26T06:01:51.000Z",
      "xQuery": "女子ばかり行列 学校トイレ巡る声"
    },
    {
      "time": "13:05",
      "title": "低価格から変化 ベローチェの戦略",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593126?source=rss",
      "publishedAt": "2026-08-26T04:05:59.000Z",
      "xQuery": "低価格から変化 ベローチェの戦略"
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
