window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T01:12:48.911Z",
  "items": [
    {
      "time": "09:36",
      "title": "日経平均 一時2200円超値上がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603764?source=rss",
      "publishedAt": "2026-11-24T00:36:37.000Z",
      "xQuery": "日経平均 一時2200円超値上がり"
    },
    {
      "time": "09:46",
      "title": "文科相 自宅家賃を政治資金で支出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603766?source=rss",
      "publishedAt": "2026-11-24T00:46:28.000Z",
      "xQuery": "文科相 自宅家賃を政治資金で支出"
    },
    {
      "time": "09:40",
      "title": "フアン氏のCEO復帰 米議会反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603761?source=rss",
      "publishedAt": "2026-11-24T00:40:56.000Z",
      "xQuery": "フアン氏のCEO復帰 米議会反発"
    },
    {
      "time": "09:02",
      "title": "フォークリフトが倒れ下敷き 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603756?source=rss",
      "publishedAt": "2026-11-24T00:02:04.000Z",
      "xQuery": "フォークリフトが倒れ下敷き 死亡"
    },
    {
      "time": "07:03",
      "title": "ロッククライミング中に滑落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603737?source=rss",
      "publishedAt": "2026-11-23T22:03:20.000Z",
      "xQuery": "ロッククライミング中に滑落 死亡"
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
