window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T10:49:15.816Z",
  "items": [
    {
      "time": "19:00",
      "title": "今年度補正予算成立 総額3兆円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583073?source=rss",
      "publishedAt": "2026-06-05T10:00:17.000Z",
      "xQuery": "今年度補正予算成立 総額3兆円超"
    },
    {
      "time": "19:06",
      "title": "長崎原爆資料館の展示案 中国反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583072?source=rss",
      "publishedAt": "2026-06-05T10:06:16.000Z",
      "xQuery": "長崎原爆資料館の展示案 中国反発"
    },
    {
      "time": "17:33",
      "title": "大学生暴行死 女に無期懲役を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583059?source=rss",
      "publishedAt": "2026-06-05T08:33:20.000Z",
      "xQuery": "大学生暴行死 女に無期懲役を求刑"
    },
    {
      "time": "19:40",
      "title": "みんなで大家さん4.5億円返還命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583083?source=rss",
      "publishedAt": "2026-06-05T10:40:43.000Z",
      "xQuery": "みんなで大家さん4.5億円返還命令"
    },
    {
      "time": "19:41",
      "title": "行方不明の元教頭 横領疑いで逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583078?source=rss",
      "publishedAt": "2026-06-05T10:41:49.000Z",
      "xQuery": "行方不明の元教頭 横領疑いで逮捕"
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
