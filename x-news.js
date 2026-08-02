window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T01:40:04.520Z",
  "items": [
    {
      "time": "10:33",
      "title": "熊本地震の死者38人に 県発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590230?source=rss",
      "publishedAt": "2026-08-02T01:33:24.000Z",
      "xQuery": "熊本地震の死者38人に 県発表"
    },
    {
      "time": "09:15",
      "title": "エボラ熱 コンゴで過去最大の流行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590219?source=rss",
      "publishedAt": "2026-08-02T00:15:54.000Z",
      "xQuery": "エボラ熱 コンゴで過去最大の流行"
    },
    {
      "time": "09:55",
      "title": "出産費無償化へ 医療界に不安の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590224?source=rss",
      "publishedAt": "2026-08-02T00:55:07.000Z",
      "xQuery": "出産費無償化へ 医療界に不安の声"
    },
    {
      "time": "10:13",
      "title": "日帰り部活遠征26万円 現場の葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590226?source=rss",
      "publishedAt": "2026-08-02T01:13:41.000Z",
      "xQuery": "日帰り部活遠征26万円 現場の葛藤"
    },
    {
      "time": "08:44",
      "title": "帰省中に行方不明の2歳 無事発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590217?source=rss",
      "publishedAt": "2026-08-01T23:44:33.000Z",
      "xQuery": "帰省中に行方不明の2歳 無事発見"
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
