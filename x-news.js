window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T01:39:29.348Z",
  "items": [
    {
      "time": "09:45",
      "title": "米民主党 次のリーダー不在課題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601386?source=rss",
      "publishedAt": "2026-11-05T00:45:30.000Z",
      "xQuery": "米民主党 次のリーダー不在課題"
    },
    {
      "time": "07:41",
      "title": "サイバー救援隊を創設へ 政府案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601372?source=rss",
      "publishedAt": "2026-11-04T22:41:50.000Z",
      "xQuery": "サイバー救援隊を創設へ 政府案"
    },
    {
      "time": "10:14",
      "title": "仏銀行サイバー攻撃 177億円流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601387?source=rss",
      "publishedAt": "2026-11-05T01:14:21.000Z",
      "xQuery": "仏銀行サイバー攻撃 177億円流出"
    },
    {
      "time": "08:22",
      "title": "幹部逮捕 川崎市役所を家宅捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601377?source=rss",
      "publishedAt": "2026-11-04T23:22:44.000Z",
      "xQuery": "幹部逮捕 川崎市役所を家宅捜索"
    },
    {
      "time": "08:56",
      "title": "「哲代おばあちゃん」死去 106歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601381?source=rss",
      "publishedAt": "2026-11-04T23:56:54.000Z",
      "xQuery": "「哲代おばあちゃん」死去 106歳"
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
