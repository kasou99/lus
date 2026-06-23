window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T07:28:49.400Z",
  "items": [
    {
      "time": "15:48",
      "title": "東証終値2565円安 7万円割り込む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585354?source=rss",
      "publishedAt": "2026-06-23T06:48:51.000Z",
      "xQuery": "東証終値2565円安 7万円割り込む"
    },
    {
      "time": "15:48",
      "title": "沖縄戦追悼式 首相スピーチ中ヤジ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585353?source=rss",
      "publishedAt": "2026-06-23T06:48:08.000Z",
      "xQuery": "沖縄戦追悼式 首相スピーチ中ヤジ"
    },
    {
      "time": "15:20",
      "title": "副首都法案の修正案 自民が了承",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585342?source=rss",
      "publishedAt": "2026-06-23T06:20:13.000Z",
      "xQuery": "副首都法案の修正案 自民が了承"
    },
    {
      "time": "14:04",
      "title": "同僚に殴られ 意識不明の男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585338?source=rss",
      "publishedAt": "2026-06-23T05:04:43.000Z",
      "xQuery": "同僚に殴られ 意識不明の男性死亡"
    },
    {
      "time": "15:50",
      "title": "小学校で約40人嘔吐など訴え欠席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585355?source=rss",
      "publishedAt": "2026-06-23T06:50:59.000Z",
      "xQuery": "小学校で約40人嘔吐など訴え欠席"
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
