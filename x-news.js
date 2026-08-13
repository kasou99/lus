window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T04:40:43.438Z",
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
      "time": "12:39",
      "title": "大気が不安定 局地的な大雨に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591559?source=rss",
      "publishedAt": "2026-08-13T03:39:11.000Z",
      "xQuery": "大気が不安定 局地的な大雨に警戒"
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
      "time": "13:32",
      "title": "泳いで母助けに 18歳遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591571?source=rss",
      "publishedAt": "2026-08-13T04:32:33.000Z",
      "xQuery": "泳いで母助けに 18歳遺体で発見"
    },
    {
      "time": "13:11",
      "title": "新スペース・マウンテン 名称決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591568?source=rss",
      "publishedAt": "2026-08-13T04:11:12.000Z",
      "xQuery": "新スペース・マウンテン 名称決定"
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
