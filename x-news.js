window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T01:25:42.935Z",
  "items": [
    {
      "time": "09:43",
      "title": "米同時テロの遺族 悲しみ死ぬまで",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594925?source=rss",
      "publishedAt": "2026-09-11T00:43:31.000Z",
      "xQuery": "米同時テロの遺族 悲しみ死ぬまで"
    },
    {
      "time": "09:32",
      "title": "日経平均 一時2000円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594924?source=rss",
      "publishedAt": "2026-09-11T00:32:12.000Z",
      "xQuery": "日経平均 一時2000円以上値下がり"
    },
    {
      "time": "09:13",
      "title": "1泊20万円の高野山宿坊も 嘆く声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594923?source=rss",
      "publishedAt": "2026-09-11T00:13:48.000Z",
      "xQuery": "1泊20万円の高野山宿坊も 嘆く声"
    },
    {
      "time": "07:48",
      "title": "給食チキンナゲットでアレルギー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594917?source=rss",
      "publishedAt": "2026-09-10T22:48:14.000Z",
      "xQuery": "給食チキンナゲットでアレルギー"
    },
    {
      "time": "08:59",
      "title": "水星 誕生以降半径10キロ以上縮む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594922?source=rss",
      "publishedAt": "2026-09-10T23:59:56.000Z",
      "xQuery": "水星 誕生以降半径10キロ以上縮む"
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
