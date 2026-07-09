window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T12:08:55.862Z",
  "items": [
    {
      "time": "20:39",
      "title": "元宮内庁長官 典範は構造的欠陥",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587339?source=rss",
      "publishedAt": "2026-07-09T11:39:38.000Z",
      "xQuery": "元宮内庁長官 典範は構造的欠陥"
    },
    {
      "time": "19:30",
      "title": "10日以降も暑さに警戒 猛暑日続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587334?source=rss",
      "publishedAt": "2026-07-09T10:30:36.000Z",
      "xQuery": "10日以降も暑さに警戒 猛暑日続出"
    },
    {
      "time": "20:18",
      "title": "国産人型ロボ 三菱自動車が量産へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587337?source=rss",
      "publishedAt": "2026-07-09T11:18:06.000Z",
      "xQuery": "国産人型ロボ 三菱自動車が量産へ"
    },
    {
      "time": "20:38",
      "title": "山本太郎氏 政界引退を表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587340?source=rss",
      "publishedAt": "2026-07-09T11:38:41.000Z",
      "xQuery": "山本太郎氏 政界引退を表明"
    },
    {
      "time": "18:56",
      "title": "川底で高校生2人を発見 心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587330?source=rss",
      "publishedAt": "2026-07-09T09:56:47.000Z",
      "xQuery": "川底で高校生2人を発見 心肺停止"
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
