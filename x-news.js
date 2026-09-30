window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T08:49:36.275Z",
  "items": [
    {
      "time": "16:17",
      "title": "核ごみ文献調査 常陸大宮市が容認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597074?source=rss",
      "publishedAt": "2026-09-30T07:17:54.000Z",
      "xQuery": "核ごみ文献調査 常陸大宮市が容認"
    },
    {
      "time": "16:21",
      "title": "両陛下 八代市で被災者をお見舞い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597073?source=rss",
      "publishedAt": "2026-09-30T07:21:44.000Z",
      "xQuery": "両陛下 八代市で被災者をお見舞い"
    },
    {
      "time": "17:17",
      "title": "声は「人格の象徴」初の司法判断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597082?source=rss",
      "publishedAt": "2026-09-30T08:17:18.000Z",
      "xQuery": "声は「人格の象徴」初の司法判断"
    },
    {
      "time": "17:35",
      "title": "妻の遺体切断し遺棄疑い 医師逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597086?source=rss",
      "publishedAt": "2026-09-30T08:35:41.000Z",
      "xQuery": "妻の遺体切断し遺棄疑い 医師逮捕"
    },
    {
      "time": "15:31",
      "title": "神戸の発砲事件で男逮捕 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597068?source=rss",
      "publishedAt": "2026-09-30T06:31:23.000Z",
      "xQuery": "神戸の発砲事件で男逮捕 1人死亡"
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
