window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T13:22:47.728Z",
  "items": [
    {
      "time": "22:09",
      "title": "バヌアツで噴火 気象庁が津波調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593068?source=rss",
      "publishedAt": "2026-08-25T13:09:30.000Z",
      "xQuery": "バヌアツで噴火 気象庁が津波調査"
    },
    {
      "time": "20:13",
      "title": "AI事業者へ知財保護指針 政府決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593055?source=rss",
      "publishedAt": "2026-08-25T11:13:01.000Z",
      "xQuery": "AI事業者へ知財保護指針 政府決定"
    },
    {
      "time": "22:16",
      "title": "飲酒事故で3児失う 20年苦しむ母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593066?source=rss",
      "publishedAt": "2026-08-25T13:16:17.000Z",
      "xQuery": "飲酒事故で3児失う 20年苦しむ母"
    },
    {
      "time": "20:19",
      "title": "中国産白菜巡り波紋 韓国に飛び火",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593056?source=rss",
      "publishedAt": "2026-08-25T11:19:09.000Z",
      "xQuery": "中国産白菜巡り波紋 韓国に飛び火"
    },
    {
      "time": "20:04",
      "title": "川底に沈む男児発見 中学生ら救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593054?source=rss",
      "publishedAt": "2026-08-25T11:04:18.000Z",
      "xQuery": "川底に沈む男児発見 中学生ら救助"
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
