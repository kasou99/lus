window.LUS_X_NEWS = {
  "updatedAt": "2026-08-10T11:50:16.025Z",
  "items": [
    {
      "time": "17:58",
      "title": "長野の土石流 登山者は全員下山",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591220?source=rss",
      "publishedAt": "2026-08-10T08:58:40.000Z",
      "xQuery": "長野の土石流 登山者は全員下山"
    },
    {
      "time": "17:30",
      "title": "母は寝たきり娘は不登校 女性孤立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591215?source=rss",
      "publishedAt": "2026-08-10T08:30:12.000Z",
      "xQuery": "母は寝たきり娘は不登校 女性孤立"
    },
    {
      "time": "20:20",
      "title": "冷凍庫遺体 殺人疑いで元妻再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591241?source=rss",
      "publishedAt": "2026-08-10T11:20:09.000Z",
      "xQuery": "冷凍庫遺体 殺人疑いで元妻再逮捕"
    },
    {
      "time": "20:30",
      "title": "生徒送迎中バスが追突し逃走 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591243?source=rss",
      "publishedAt": "2026-08-10T11:30:33.000Z",
      "xQuery": "生徒送迎中バスが追突し逃走 逮捕"
    },
    {
      "time": "19:08",
      "title": "男児転び一時意識不明 1年非公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591233?source=rss",
      "publishedAt": "2026-08-10T10:08:02.000Z",
      "xQuery": "男児転び一時意識不明 1年非公表"
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
