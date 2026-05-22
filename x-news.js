window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T16:53:44.779Z",
  "items": [
    {
      "time": "21:18",
      "title": "首相が日銀に「適切な政策」要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581279?source=rss",
      "publishedAt": "2026-05-22T12:18:31.000Z",
      "xQuery": "首相が日銀に「適切な政策」要請"
    },
    {
      "time": "22:51",
      "title": "首相が参院幹部と会食 化粧水贈る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581291?source=rss",
      "publishedAt": "2026-05-22T13:51:49.000Z",
      "xQuery": "首相が参院幹部と会食 化粧水贈る"
    },
    {
      "time": "22:20",
      "title": "鉄板落ちてきたと通報 作業員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581286?source=rss",
      "publishedAt": "2026-05-22T13:20:47.000Z",
      "xQuery": "鉄板落ちてきたと通報 作業員死亡"
    },
    {
      "time": "23:41",
      "title": "分離帯に車乗り上げ横転 2人重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581300?source=rss",
      "publishedAt": "2026-05-22T14:41:55.000Z",
      "xQuery": "分離帯に車乗り上げ横転 2人重体"
    },
    {
      "time": "19:29",
      "title": "韓国のスターバックスで不買運動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581267?source=rss",
      "publishedAt": "2026-05-22T10:29:26.000Z",
      "xQuery": "韓国のスターバックスで不買運動"
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
