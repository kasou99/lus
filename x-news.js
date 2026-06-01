window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T10:19:52.386Z",
  "items": [
    {
      "time": "17:59",
      "title": "台風 沖縄・奄美は雨風に厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582569?source=rss",
      "publishedAt": "2026-06-01T08:59:09.000Z",
      "xQuery": "台風 沖縄・奄美は雨風に厳重警戒"
    },
    {
      "time": "17:47",
      "title": "台風 2日もJALなど約200便欠航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582563?source=rss",
      "publishedAt": "2026-06-01T08:47:26.000Z",
      "xQuery": "台風 2日もJALなど約200便欠航"
    },
    {
      "time": "19:08",
      "title": "米大統領口座で大量証券売買 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582578?source=rss",
      "publishedAt": "2026-06-01T10:08:09.000Z",
      "xQuery": "米大統領口座で大量証券売買 波紋"
    },
    {
      "time": "18:06",
      "title": "住宅で切り傷がある男女発見 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582568?source=rss",
      "publishedAt": "2026-06-01T09:06:02.000Z",
      "xQuery": "住宅で切り傷がある男女発見 死亡"
    },
    {
      "time": "17:48",
      "title": "チェーンソーで足傷つけたか 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582565?source=rss",
      "publishedAt": "2026-06-01T08:48:39.000Z",
      "xQuery": "チェーンソーで足傷つけたか 死亡"
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
