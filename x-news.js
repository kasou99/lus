window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T02:24:16.645Z",
  "items": [
    {
      "time": "10:23",
      "title": "自民裏金 大野元議員に罰金60万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585305?source=rss",
      "publishedAt": "2026-06-23T01:23:02.000Z",
      "xQuery": "自民裏金 大野元議員に罰金60万円"
    },
    {
      "time": "09:34",
      "title": "米とイラン 核査察で相違浮き彫り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585299?source=rss",
      "publishedAt": "2026-06-23T00:34:50.000Z",
      "xQuery": "米とイラン 核査察で相違浮き彫り"
    },
    {
      "time": "11:12",
      "title": "ダブル台風に警戒を 8号が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585309?source=rss",
      "publishedAt": "2026-06-23T02:12:12.000Z",
      "xQuery": "ダブル台風に警戒を 8号が発生"
    },
    {
      "time": "10:01",
      "title": "絆HD 会社更生法の適用を申請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585303?source=rss",
      "publishedAt": "2026-06-23T01:01:28.000Z",
      "xQuery": "絆HD 会社更生法の適用を申請"
    },
    {
      "time": "11:16",
      "title": "相次ぐ迷惑行為 女流棋士会が声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585310?source=rss",
      "publishedAt": "2026-06-23T02:16:29.000Z",
      "xQuery": "相次ぐ迷惑行為 女流棋士会が声明"
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
