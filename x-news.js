window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T10:37:20.847Z",
  "items": [
    {
      "time": "17:26",
      "title": "クロマグロ漁獲枠拡大 合意至らず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587908?source=rss",
      "publishedAt": "2026-07-14T08:26:06.000Z",
      "xQuery": "クロマグロ漁獲枠拡大 合意至らず"
    },
    {
      "time": "17:02",
      "title": "元死刑囚の友人 無差別殺人止める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587907?source=rss",
      "publishedAt": "2026-07-14T08:02:56.000Z",
      "xQuery": "元死刑囚の友人 無差別殺人止める"
    },
    {
      "time": "18:56",
      "title": "小泉氏 防衛省の体制「限界超え」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587932?source=rss",
      "publishedAt": "2026-07-14T09:56:56.000Z",
      "xQuery": "小泉氏 防衛省の体制「限界超え」"
    },
    {
      "time": "18:09",
      "title": "男女4人刺傷 人生に疲れたと供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587922?source=rss",
      "publishedAt": "2026-07-14T09:09:28.000Z",
      "xQuery": "男女4人刺傷 人生に疲れたと供述"
    },
    {
      "time": "18:02",
      "title": "警棒で右目失明 元生徒に中傷再燃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587921?source=rss",
      "publishedAt": "2026-07-14T09:02:53.000Z",
      "xQuery": "警棒で右目失明 元生徒に中傷再燃"
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
