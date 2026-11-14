window.LUS_X_NEWS = {
  "updatedAt": "2026-11-14T07:10:52.883Z",
  "items": [
    {
      "time": "15:27",
      "title": "マイクロソフトの障害 全面復旧",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602556?source=rss",
      "publishedAt": "2026-11-14T06:27:25.000Z",
      "xQuery": "マイクロソフトの障害 全面復旧"
    },
    {
      "time": "13:22",
      "title": "全米の空路混乱 150万人足止めか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602537?source=rss",
      "publishedAt": "2026-11-14T04:22:41.000Z",
      "xQuery": "全米の空路混乱 150万人足止めか"
    },
    {
      "time": "15:06",
      "title": "関東15日は気温急降下 師走並みか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602551?source=rss",
      "publishedAt": "2026-11-14T06:06:59.000Z",
      "xQuery": "関東15日は気温急降下 師走並みか"
    },
    {
      "time": "14:50",
      "title": "「夫を包丁で刺した」49歳女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602547?source=rss",
      "publishedAt": "2026-11-14T05:50:33.000Z",
      "xQuery": "「夫を包丁で刺した」49歳女逮捕"
    },
    {
      "time": "15:51",
      "title": "市営住宅236戸に別人が入居 伊賀",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602552?source=rss",
      "publishedAt": "2026-11-14T06:51:30.000Z",
      "xQuery": "市営住宅236戸に別人が入居 伊賀"
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
