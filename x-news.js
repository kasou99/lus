window.LUS_X_NEWS = {
  "updatedAt": "2026-11-18T08:35:24.213Z",
  "items": [
    {
      "time": "16:40",
      "title": "日本車の部品 一部共通化する方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603047?source=rss",
      "publishedAt": "2026-11-18T07:40:00.000Z",
      "xQuery": "日本車の部品 一部共通化する方針"
    },
    {
      "time": "15:17",
      "title": "受刑者の選挙権制限は合憲 最高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603035?source=rss",
      "publishedAt": "2026-11-18T06:17:47.000Z",
      "xQuery": "受刑者の選挙権制限は合憲 最高裁"
    },
    {
      "time": "15:43",
      "title": "露大統領APEC議長国に立候補表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603038?source=rss",
      "publishedAt": "2026-11-18T06:43:12.000Z",
      "xQuery": "露大統領APEC議長国に立候補表明"
    },
    {
      "time": "15:11",
      "title": "Suica新キャラ紫のうさぎ X反応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603032?source=rss",
      "publishedAt": "2026-11-18T06:11:31.000Z",
      "xQuery": "Suica新キャラ紫のうさぎ X反応"
    },
    {
      "time": "16:56",
      "title": "余った給食売る自販機 保護者が列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603050?source=rss",
      "publishedAt": "2026-11-18T07:56:41.000Z",
      "xQuery": "余った給食売る自販機 保護者が列"
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
