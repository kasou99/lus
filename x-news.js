window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T02:24:47.199Z",
  "items": [
    {
      "time": "08:04",
      "title": "骨太方針素案 有事の国営工廠検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585438?source=rss",
      "publishedAt": "2026-06-23T23:04:06.000Z",
      "xQuery": "骨太方針素案 有事の国営工廠検討"
    },
    {
      "time": "09:09",
      "title": "鹿児島県に線状降水帯発生 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585444?source=rss",
      "publishedAt": "2026-06-24T00:09:12.000Z",
      "xQuery": "鹿児島県に線状降水帯発生 警戒を"
    },
    {
      "time": "09:24",
      "title": "車が原付バイクと衝突 高校生死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585446?source=rss",
      "publishedAt": "2026-06-24T00:24:40.000Z",
      "xQuery": "車が原付バイクと衝突 高校生死亡"
    },
    {
      "time": "11:08",
      "title": "運転代行中に病死か 店などに衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585453?source=rss",
      "publishedAt": "2026-06-24T02:08:20.000Z",
      "xQuery": "運転代行中に病死か 店などに衝突"
    },
    {
      "time": "08:56",
      "title": "クマ出没巡り 市に批判など400件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585443?source=rss",
      "publishedAt": "2026-06-23T23:56:05.000Z",
      "xQuery": "クマ出没巡り 市に批判など400件"
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
