window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T15:39:50.643Z",
  "items": [
    {
      "time": "23:50",
      "title": "原油輸送確保 首脳外交求める声も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592818?source=rss",
      "publishedAt": "2026-08-23T14:50:43.000Z",
      "xQuery": "原油輸送確保 首脳外交求める声も"
    },
    {
      "time": "19:58",
      "title": "4人死亡 事故までに列車3本が通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592798?source=rss",
      "publishedAt": "2026-08-23T10:58:33.000Z",
      "xQuery": "4人死亡 事故までに列車3本が通過"
    },
    {
      "time": "21:24",
      "title": "豪雨で愛車失った人たち 悲痛な声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592807?source=rss",
      "publishedAt": "2026-08-23T12:24:38.000Z",
      "xQuery": "豪雨で愛車失った人たち 悲痛な声"
    },
    {
      "time": "23:39",
      "title": "熊本地震 窯元が葛藤の中で再出発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592819?source=rss",
      "publishedAt": "2026-08-23T14:39:04.000Z",
      "xQuery": "熊本地震 窯元が葛藤の中で再出発"
    },
    {
      "time": "20:38",
      "title": "戸建て売り入居する人も 団地人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592805?source=rss",
      "publishedAt": "2026-08-23T11:38:30.000Z",
      "xQuery": "戸建て売り入居する人も 団地人気"
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
