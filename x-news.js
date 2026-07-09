window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T07:47:17.457Z",
  "items": [
    {
      "time": "16:31",
      "title": "ロシア NATO首脳会議の決定非難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587309?source=rss",
      "publishedAt": "2026-07-09T07:31:05.000Z",
      "xQuery": "ロシア NATO首脳会議の決定非難"
    },
    {
      "time": "14:38",
      "title": "元特捜検事の不適切交際疑い 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587300?source=rss",
      "publishedAt": "2026-07-09T05:38:51.000Z",
      "xQuery": "元特捜検事の不適切交際疑い 調査"
    },
    {
      "time": "16:08",
      "title": "台風 10-11日に空の便が一部欠航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587307?source=rss",
      "publishedAt": "2026-07-09T07:08:36.000Z",
      "xQuery": "台風 10-11日に空の便が一部欠航"
    },
    {
      "time": "14:16",
      "title": "韓国の出生率反転 婚姻増の背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587285?source=rss",
      "publishedAt": "2026-07-09T05:16:25.000Z",
      "xQuery": "韓国の出生率反転 婚姻増の背景"
    },
    {
      "time": "13:37",
      "title": "外免切替「受からない」外国人増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587293?source=rss",
      "publishedAt": "2026-07-09T04:37:20.000Z",
      "xQuery": "外免切替「受からない」外国人増"
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
