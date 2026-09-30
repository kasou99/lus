window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T15:19:36.848Z",
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
      "time": "00:02",
      "title": "神戸発砲事件 死亡男性は会社役員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597119?source=rss",
      "publishedAt": "2026-09-30T15:02:19.000Z",
      "xQuery": "神戸発砲事件 死亡男性は会社役員"
    },
    {
      "time": "23:37",
      "title": "世界大学ランキング 東北大に注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597092?source=rss",
      "publishedAt": "2026-09-30T14:37:27.000Z",
      "xQuery": "世界大学ランキング 東北大に注目"
    },
    {
      "time": "23:05",
      "title": "映画オデュッセイアの天候を考察",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597117?source=rss",
      "publishedAt": "2026-09-30T14:05:46.000Z",
      "xQuery": "映画オデュッセイアの天候を考察"
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
