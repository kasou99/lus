window.LUS_X_NEWS = {
  "updatedAt": "2026-09-17T10:18:20.692Z",
  "items": [
    {
      "time": "19:14",
      "title": "内閣改造 高市首相「実行力重視」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595618?source=rss",
      "publishedAt": "2026-09-17T10:14:50.000Z",
      "xQuery": "内閣改造 高市首相「実行力重視」"
    },
    {
      "time": "16:18",
      "title": "台風影響 関東は21日ごろ大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595594?source=rss",
      "publishedAt": "2026-09-17T07:18:24.000Z",
      "xQuery": "台風影響 関東は21日ごろ大雨恐れ"
    },
    {
      "time": "18:06",
      "title": "スーパー従業員刺され死亡 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595607?source=rss",
      "publishedAt": "2026-09-17T09:06:56.000Z",
      "xQuery": "スーパー従業員刺され死亡 男逮捕"
    },
    {
      "time": "16:53",
      "title": "サンマルクHDがつるとんたん買収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595599?source=rss",
      "publishedAt": "2026-09-17T07:53:26.000Z",
      "xQuery": "サンマルクHDがつるとんたん買収"
    },
    {
      "time": "17:03",
      "title": "TDS新規ショー決定 100億円投資",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595601?source=rss",
      "publishedAt": "2026-09-17T08:03:47.000Z",
      "xQuery": "TDS新規ショー決定 100億円投資"
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
