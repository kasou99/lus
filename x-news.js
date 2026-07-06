window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T10:40:33.371Z",
  "items": [
    {
      "time": "18:22",
      "title": "消費減税 13日にも協議再開で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586961?source=rss",
      "publishedAt": "2026-07-06T09:22:29.000Z",
      "xQuery": "消費減税 13日にも協議再開で合意"
    },
    {
      "time": "18:57",
      "title": "中国が進める世論工作 圧力拡大か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586964?source=rss",
      "publishedAt": "2026-07-06T09:57:32.000Z",
      "xQuery": "中国が進める世論工作 圧力拡大か"
    },
    {
      "time": "18:05",
      "title": "女性が刺され死亡 直後に死亡事故",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586959?source=rss",
      "publishedAt": "2026-07-06T09:05:36.000Z",
      "xQuery": "女性が刺され死亡 直後に死亡事故"
    },
    {
      "time": "19:29",
      "title": "同居人の唇を縫った疑い 女を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586966?source=rss",
      "publishedAt": "2026-07-06T10:29:48.000Z",
      "xQuery": "同居人の唇を縫った疑い 女を逮捕"
    },
    {
      "time": "19:08",
      "title": "物価高 20代会社員のリアルな弁当",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586963?source=rss",
      "publishedAt": "2026-07-06T10:08:08.000Z",
      "xQuery": "物価高 20代会社員のリアルな弁当"
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
