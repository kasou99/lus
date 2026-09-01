window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T19:36:49.144Z",
  "items": [
    {
      "time": "23:18",
      "title": "防災庁を11月創設へ 課題は山積",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593915?source=rss",
      "publishedAt": "2026-09-01T14:18:59.000Z",
      "xQuery": "防災庁を11月創設へ 課題は山積"
    },
    {
      "time": "20:51",
      "title": "ラーメンの缶詰も 防災グッズ進化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593898?source=rss",
      "publishedAt": "2026-09-01T11:51:31.000Z",
      "xQuery": "ラーメンの缶詰も 防災グッズ進化"
    },
    {
      "time": "23:33",
      "title": "フラット35 9月の適用金利3.46%",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593916?source=rss",
      "publishedAt": "2026-09-01T14:33:57.000Z",
      "xQuery": "フラット35 9月の適用金利3.46%"
    },
    {
      "time": "21:50",
      "title": "「エクモ」で接続ミス 患者が重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593905?source=rss",
      "publishedAt": "2026-09-01T12:50:10.000Z",
      "xQuery": "「エクモ」で接続ミス 患者が重体"
    },
    {
      "time": "21:34",
      "title": "学歴ネタ動画 福島大の学長が反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593903?source=rss",
      "publishedAt": "2026-09-01T12:34:11.000Z",
      "xQuery": "学歴ネタ動画 福島大の学長が反発"
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
