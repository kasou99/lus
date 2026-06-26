window.LUS_X_NEWS = {
  "updatedAt": "2026-06-26T13:47:23.035Z",
  "items": [
    {
      "time": "22:39",
      "title": "山梨県で震度6弱 津波心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585804?source=rss",
      "publishedAt": "2026-06-26T13:39:34.000Z",
      "xQuery": "山梨県で震度6弱 津波心配なし"
    },
    {
      "time": "22:32",
      "title": "安全確保を 地震発生時のNG行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585553?source=rss",
      "publishedAt": "2026-06-26T13:32:46.000Z",
      "xQuery": "安全確保を 地震発生時のNG行動"
    },
    {
      "time": "20:14",
      "title": "大雨ピークは2回 災害に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585791?source=rss",
      "publishedAt": "2026-06-26T11:14:50.000Z",
      "xQuery": "大雨ピークは2回 災害に厳重警戒"
    },
    {
      "time": "21:10",
      "title": "雨で増水した川に転落か 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585797?source=rss",
      "publishedAt": "2026-06-26T12:10:45.000Z",
      "xQuery": "雨で増水した川に転落か 男性死亡"
    },
    {
      "time": "22:15",
      "title": "ベネズエラ 安否不明登録4万人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585801?source=rss",
      "publishedAt": "2026-06-26T13:15:14.000Z",
      "xQuery": "ベネズエラ 安否不明登録4万人超"
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
