window.LUS_X_NEWS = {
  "updatedAt": "2026-08-24T02:34:02.198Z",
  "items": [
    {
      "time": "11:08",
      "title": "綿貫民輔さんが死去 元衆院議長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592852?source=rss",
      "publishedAt": "2026-08-24T02:08:57.000Z",
      "xQuery": "綿貫民輔さんが死去 元衆院議長"
    },
    {
      "time": "08:02",
      "title": "露のウ侵攻から4年半 広がる戦禍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592836?source=rss",
      "publishedAt": "2026-08-23T23:02:34.000Z",
      "xQuery": "露のウ侵攻から4年半 広がる戦禍"
    },
    {
      "time": "08:56",
      "title": "猛暑の仏 溺死者が300人超える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592842?source=rss",
      "publishedAt": "2026-08-23T23:56:52.000Z",
      "xQuery": "猛暑の仏 溺死者が300人超える"
    },
    {
      "time": "09:57",
      "title": "福岡県議会の蔵内氏 議員辞職へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592847?source=rss",
      "publishedAt": "2026-08-24T00:57:10.000Z",
      "xQuery": "福岡県議会の蔵内氏 議員辞職へ"
    },
    {
      "time": "10:55",
      "title": "蔵内氏辞職表明 福岡知事コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592851?source=rss",
      "publishedAt": "2026-08-24T01:55:54.000Z",
      "xQuery": "蔵内氏辞職表明 福岡知事コメント"
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
