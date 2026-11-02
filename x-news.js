window.LUS_X_NEWS = {
  "updatedAt": "2026-11-02T05:36:17.620Z",
  "items": [
    {
      "time": "13:11",
      "title": "防災相 世界一の防災大国を目指す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601050?source=rss",
      "publishedAt": "2026-11-02T04:11:59.000Z",
      "xQuery": "防災相 世界一の防災大国を目指す"
    },
    {
      "time": "11:11",
      "title": "提供精子で誕生 子どもにどう告知",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601035?source=rss",
      "publishedAt": "2026-11-02T02:11:19.000Z",
      "xQuery": "提供精子で誕生 子どもにどう告知"
    },
    {
      "time": "13:54",
      "title": "「アララ」7700万件のメアド流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601057?source=rss",
      "publishedAt": "2026-11-02T04:54:46.000Z",
      "xQuery": "「アララ」7700万件のメアド流出"
    },
    {
      "time": "12:39",
      "title": "フラット35 金利3.81%で過去2番目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601048?source=rss",
      "publishedAt": "2026-11-02T03:39:43.000Z",
      "xQuery": "フラット35 金利3.81%で過去2番目"
    },
    {
      "time": "13:13",
      "title": "釣り中に海転落 不明の1人も死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601051?source=rss",
      "publishedAt": "2026-11-02T04:13:55.000Z",
      "xQuery": "釣り中に海転落 不明の1人も死亡"
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
