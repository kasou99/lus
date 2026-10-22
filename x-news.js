window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T12:26:59.049Z",
  "items": [
    {
      "time": "18:04",
      "title": "台風30号 非常に強い勢力で沖縄へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599718?source=rss",
      "publishedAt": "2026-10-22T09:04:33.000Z",
      "xQuery": "台風30号 非常に強い勢力で沖縄へ"
    },
    {
      "time": "19:11",
      "title": "発足1年の高市政権 麻生氏が評価",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599724?source=rss",
      "publishedAt": "2026-10-22T10:11:06.000Z",
      "xQuery": "発足1年の高市政権 麻生氏が評価"
    },
    {
      "time": "18:54",
      "title": "カプコン 1177万件の情報漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599723?source=rss",
      "publishedAt": "2026-10-22T09:54:24.000Z",
      "xQuery": "カプコン 1177万件の情報漏えい"
    },
    {
      "time": "17:51",
      "title": "不登校のほぼ半数 学校健診受けず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599714?source=rss",
      "publishedAt": "2026-10-22T08:51:58.000Z",
      "xQuery": "不登校のほぼ半数 学校健診受けず"
    },
    {
      "time": "19:44",
      "title": "関東でスガキヤ行列 愛知県民驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599726?source=rss",
      "publishedAt": "2026-10-22T10:44:31.000Z",
      "xQuery": "関東でスガキヤ行列 愛知県民驚き"
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
