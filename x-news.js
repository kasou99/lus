window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T08:17:55.588Z",
  "items": [
    {
      "time": "16:08",
      "title": "ANA AIRDOなど完全子会社化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600561?source=rss",
      "publishedAt": "2026-10-29T07:08:06.000Z",
      "xQuery": "ANA AIRDOなど完全子会社化へ"
    },
    {
      "time": "13:56",
      "title": "GMOサイバー攻撃 捜査の焦点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600531?source=rss",
      "publishedAt": "2026-10-29T04:56:54.000Z",
      "xQuery": "GMOサイバー攻撃 捜査の焦点は"
    },
    {
      "time": "16:58",
      "title": "韓国・尹前大統領に再び死刑求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600566?source=rss",
      "publishedAt": "2026-10-29T07:58:28.000Z",
      "xQuery": "韓国・尹前大統領に再び死刑求刑"
    },
    {
      "time": "14:52",
      "title": "銀座の異臭騒ぎ 傷害疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600551?source=rss",
      "publishedAt": "2026-10-29T05:52:56.000Z",
      "xQuery": "銀座の異臭騒ぎ 傷害疑いで男逮捕"
    },
    {
      "time": "11:18",
      "title": "新型パジェロ予約受注 年度目標超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600522?source=rss",
      "publishedAt": "2026-10-29T02:18:32.000Z",
      "xQuery": "新型パジェロ予約受注 年度目標超"
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
