window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T03:11:31.026Z",
  "items": [
    {
      "time": "12:05",
      "title": "北海道で大雨 土砂災害に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588493?source=rss",
      "publishedAt": "2026-07-19T03:05:45.000Z",
      "xQuery": "北海道で大雨 土砂災害に注意"
    },
    {
      "time": "09:34",
      "title": "延長国会も綱渡り 審議実質3日間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588472?source=rss",
      "publishedAt": "2026-07-19T00:34:12.000Z",
      "xQuery": "延長国会も綱渡り 審議実質3日間"
    },
    {
      "time": "11:07",
      "title": "男性転落 巻き込まれた歩行者死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588485?source=rss",
      "publishedAt": "2026-07-19T02:07:06.000Z",
      "xQuery": "男性転落 巻き込まれた歩行者死亡"
    },
    {
      "time": "11:10",
      "title": "夏休み中の「学校開放」現場困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588484?source=rss",
      "publishedAt": "2026-07-19T02:10:29.000Z",
      "xQuery": "夏休み中の「学校開放」現場困惑"
    },
    {
      "time": "10:59",
      "title": "1円玉1億3200万枚量産 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588483?source=rss",
      "publishedAt": "2026-07-19T01:59:49.000Z",
      "xQuery": "1円玉1億3200万枚量産 背景"
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
