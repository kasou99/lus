window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T02:56:01.762Z",
  "items": [
    {
      "time": "09:39",
      "title": "相次ぐ熱中症患者 救急医療ひっ迫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592974?source=rss",
      "publishedAt": "2026-08-25T00:39:57.000Z",
      "xQuery": "相次ぐ熱中症患者 救急医療ひっ迫"
    },
    {
      "time": "09:47",
      "title": "8/22の世界海面水温 観測史上最高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592975?source=rss",
      "publishedAt": "2026-08-25T00:47:08.000Z",
      "xQuery": "8/22の世界海面水温 観測史上最高"
    },
    {
      "time": "11:41",
      "title": "蔵内氏「限界だろう」辞職表明前",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592989?source=rss",
      "publishedAt": "2026-08-25T02:41:49.000Z",
      "xQuery": "蔵内氏「限界だろう」辞職表明前"
    },
    {
      "time": "11:29",
      "title": "買春目的の訪日客増 対応求める声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592984?source=rss",
      "publishedAt": "2026-08-25T02:29:49.000Z",
      "xQuery": "買春目的の訪日客増 対応求める声"
    },
    {
      "time": "11:32",
      "title": "田久保氏PCに偽造卒業証書データ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592982?source=rss",
      "publishedAt": "2026-08-25T02:32:49.000Z",
      "xQuery": "田久保氏PCに偽造卒業証書データ"
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
