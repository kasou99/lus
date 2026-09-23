window.LUS_X_NEWS = {
  "updatedAt": "2026-09-23T06:31:59.492Z",
  "items": [
    {
      "time": "12:32",
      "title": "5連休最終日 Uターンで交通混雑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596238?source=rss",
      "publishedAt": "2026-09-23T03:32:07.000Z",
      "xQuery": "5連休最終日 Uターンで交通混雑"
    },
    {
      "time": "12:59",
      "title": "首相 ゼレンスキー大統領と初会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596241?source=rss",
      "publishedAt": "2026-09-23T03:59:54.000Z",
      "xQuery": "首相 ゼレンスキー大統領と初会談"
    },
    {
      "time": "13:19",
      "title": "「疲れた」1カ月余りで店3度被災",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596243?source=rss",
      "publishedAt": "2026-09-23T04:19:23.000Z",
      "xQuery": "「疲れた」1カ月余りで店3度被災"
    },
    {
      "time": "13:53",
      "title": "JCOMで障害 ネット利用できず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596246?source=rss",
      "publishedAt": "2026-09-23T04:53:24.000Z",
      "xQuery": "JCOMで障害 ネット利用できず"
    },
    {
      "time": "13:39",
      "title": "無人の軽トラ動き男性下敷き 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596244?source=rss",
      "publishedAt": "2026-09-23T04:39:02.000Z",
      "xQuery": "無人の軽トラ動き男性下敷き 死亡"
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
