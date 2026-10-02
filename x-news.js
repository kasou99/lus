window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T10:18:46.870Z",
  "items": [
    {
      "time": "18:18",
      "title": "簗氏 予算削減発言おおむね認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597305?source=rss",
      "publishedAt": "2026-10-02T09:18:29.000Z",
      "xQuery": "簗氏 予算削減発言おおむね認める"
    },
    {
      "time": "18:00",
      "title": "住宅焼け跡から3人の遺体 津市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597299?source=rss",
      "publishedAt": "2026-10-02T09:00:19.000Z",
      "xQuery": "住宅焼け跡から3人の遺体 津市"
    },
    {
      "time": "18:10",
      "title": "紀州ドンファンの遺言有効 最高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597303?source=rss",
      "publishedAt": "2026-10-02T09:10:37.000Z",
      "xQuery": "紀州ドンファンの遺言有効 最高裁"
    },
    {
      "time": "17:11",
      "title": "クマに腕かまれる 一緒に10m滑落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597292?source=rss",
      "publishedAt": "2026-10-02T08:11:21.000Z",
      "xQuery": "クマに腕かまれる 一緒に10m滑落"
    },
    {
      "time": "18:40",
      "title": "新名神事故 原形留めぬ車に遺族涙",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597307?source=rss",
      "publishedAt": "2026-10-02T09:40:00.000Z",
      "xQuery": "新名神事故 原形留めぬ車に遺族涙"
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
