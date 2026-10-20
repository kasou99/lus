window.LUS_X_NEWS = {
  "updatedAt": "2026-10-20T14:17:29.699Z",
  "items": [
    {
      "time": "20:34",
      "title": "民主改革の会 1人年4万円給付案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599506?source=rss",
      "publishedAt": "2026-10-20T11:34:30.000Z",
      "xQuery": "民主改革の会 1人年4万円給付案"
    },
    {
      "time": "18:36",
      "title": "6人死亡事故判決 遺族複雑な思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599497?source=rss",
      "publishedAt": "2026-10-20T09:36:43.000Z",
      "xQuery": "6人死亡事故判決 遺族複雑な思い"
    },
    {
      "time": "22:29",
      "title": "台風30号 本州付近に来週接近恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599518?source=rss",
      "publishedAt": "2026-10-20T13:29:05.000Z",
      "xQuery": "台風30号 本州付近に来週接近恐れ"
    },
    {
      "time": "21:57",
      "title": "フラット35 全国で不適正利用64件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599514?source=rss",
      "publishedAt": "2026-10-20T12:57:14.000Z",
      "xQuery": "フラット35 全国で不適正利用64件"
    },
    {
      "time": "22:26",
      "title": "墓石6.7トン不法投棄疑い 2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599516?source=rss",
      "publishedAt": "2026-10-20T13:26:08.000Z",
      "xQuery": "墓石6.7トン不法投棄疑い 2人逮捕"
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
