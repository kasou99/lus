window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T07:10:07.798Z",
  "items": [
    {
      "time": "13:43",
      "title": "官房長官 中東情勢の悪化を懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583799?source=rss",
      "publishedAt": "2026-06-11T04:43:04.000Z",
      "xQuery": "官房長官 中東情勢の悪化を懸念"
    },
    {
      "time": "11:29",
      "title": "原油の代替調達 来月100%見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583787?source=rss",
      "publishedAt": "2026-06-11T02:29:57.000Z",
      "xQuery": "原油の代替調達 来月100%見通し"
    },
    {
      "time": "14:44",
      "title": "高校生の遺体 殺人疑い視野に捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583807?source=rss",
      "publishedAt": "2026-06-11T05:44:45.000Z",
      "xQuery": "高校生の遺体 殺人疑い視野に捜査"
    },
    {
      "time": "15:12",
      "title": "暴行死 当時18歳男に懲役20年求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583809?source=rss",
      "publishedAt": "2026-06-11T06:12:13.000Z",
      "xQuery": "暴行死 当時18歳男に懲役20年求刑"
    },
    {
      "time": "15:58",
      "title": "セクハラ辞職 田川市前市長出馬へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583813?source=rss",
      "publishedAt": "2026-06-11T06:58:43.000Z",
      "xQuery": "セクハラ辞職 田川市前市長出馬へ"
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
