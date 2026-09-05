window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T00:47:12.672Z",
  "items": [
    {
      "time": "06:38",
      "title": "屋久島町に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594249?source=rss",
      "publishedAt": "2026-09-04T21:38:10.000Z",
      "xQuery": "屋久島町に特別警報 最新情報"
    },
    {
      "time": "09:04",
      "title": "内閣改造・党人事 首相の狙いは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594270?source=rss",
      "publishedAt": "2026-09-05T00:04:34.000Z",
      "xQuery": "内閣改造・党人事 首相の狙いは"
    },
    {
      "time": "08:38",
      "title": "障害者雇用巡り那覇の業者を調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594267?source=rss",
      "publishedAt": "2026-09-04T23:38:06.000Z",
      "xQuery": "障害者雇用巡り那覇の業者を調査"
    },
    {
      "time": "08:35",
      "title": "追突後40m後退 男性はねられ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594264?source=rss",
      "publishedAt": "2026-09-04T23:35:35.000Z",
      "xQuery": "追突後40m後退 男性はねられ死亡"
    },
    {
      "time": "09:37",
      "title": "住宅購入急ぐ若年層 リスクに警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594274?source=rss",
      "publishedAt": "2026-09-05T00:37:14.000Z",
      "xQuery": "住宅購入急ぐ若年層 リスクに警鐘"
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
