window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T13:43:00.524Z",
  "items": [
    {
      "time": "22:02",
      "title": "米軍 IS巡るイラクでの任務を終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597112?source=rss",
      "publishedAt": "2026-09-30T13:02:02.000Z",
      "xQuery": "米軍 IS巡るイラクでの任務を終了"
    },
    {
      "time": "18:17",
      "title": "明治大 アラスカ先住民の遺骨返還",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597095?source=rss",
      "publishedAt": "2026-09-30T09:17:24.000Z",
      "xQuery": "明治大 アラスカ先住民の遺骨返還"
    },
    {
      "time": "20:14",
      "title": "麻生氏 土地3カ所の資産報告せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597105?source=rss",
      "publishedAt": "2026-09-30T11:14:59.000Z",
      "xQuery": "麻生氏 土地3カ所の資産報告せず"
    },
    {
      "time": "18:05",
      "title": "8.2億円相当の暗号資産 詐欺被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597089?source=rss",
      "publishedAt": "2026-09-30T09:05:12.000Z",
      "xQuery": "8.2億円相当の暗号資産 詐欺被害"
    },
    {
      "time": "21:47",
      "title": "西武渋谷店が閉店 入り口は大混雑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597110?source=rss",
      "publishedAt": "2026-09-30T12:47:34.000Z",
      "xQuery": "西武渋谷店が閉店 入り口は大混雑"
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
