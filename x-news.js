window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T21:56:57.921Z",
  "items": [
    {
      "time": "23:16",
      "title": "ホルムズ 自衛隊派遣の積極論浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584394?source=rss",
      "publishedAt": "2026-06-15T14:16:47.000Z",
      "xQuery": "ホルムズ 自衛隊派遣の積極論浮上"
    },
    {
      "time": "23:00",
      "title": "日伊 先端技術分野の協力巡り声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584392?source=rss",
      "publishedAt": "2026-06-15T14:00:49.000Z",
      "xQuery": "日伊 先端技術分野の協力巡り声明"
    },
    {
      "time": "00:03",
      "title": "県開発苗木が中国流出か 知事怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584396?source=rss",
      "publishedAt": "2026-06-15T15:03:38.000Z",
      "xQuery": "県開発苗木が中国流出か 知事怒り"
    },
    {
      "time": "22:13",
      "title": "飼いネコ4匹 サルに襲われて死ぬ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584388?source=rss",
      "publishedAt": "2026-06-15T13:13:14.000Z",
      "xQuery": "飼いネコ4匹 サルに襲われて死ぬ"
    },
    {
      "time": "06:35",
      "title": "物価高対策P詐取疑い 15歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584399?source=rss",
      "publishedAt": "2026-06-15T21:35:41.000Z",
      "xQuery": "物価高対策P詐取疑い 15歳を逮捕"
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
