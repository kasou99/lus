window.LUS_X_NEWS = {
  "updatedAt": "2026-08-18T08:47:03.056Z",
  "items": [
    {
      "time": "16:55",
      "title": "千葉豪雨で13人死亡 1人行方不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592186?source=rss",
      "publishedAt": "2026-08-18T07:55:01.000Z",
      "xQuery": "千葉豪雨で13人死亡 1人行方不明"
    },
    {
      "time": "17:42",
      "title": "19日危険な暑さ 九州北部38℃予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592193?source=rss",
      "publishedAt": "2026-08-18T08:42:29.000Z",
      "xQuery": "19日危険な暑さ 九州北部38℃予想"
    },
    {
      "time": "16:19",
      "title": "玉木氏 北方領土巡る政府対応批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592180?source=rss",
      "publishedAt": "2026-08-18T07:19:33.000Z",
      "xQuery": "玉木氏 北方領土巡る政府対応批判"
    },
    {
      "time": "16:39",
      "title": "クレーン車に自転車ひかれ 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592183?source=rss",
      "publishedAt": "2026-08-18T07:39:18.000Z",
      "xQuery": "クレーン車に自転車ひかれ 死亡"
    },
    {
      "time": "16:40",
      "title": "開店祝いに著名人名無断使用 謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592184?source=rss",
      "publishedAt": "2026-08-18T07:40:06.000Z",
      "xQuery": "開店祝いに著名人名無断使用 謝罪"
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
