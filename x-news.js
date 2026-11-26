window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T08:15:35.265Z",
  "items": [
    {
      "time": "16:37",
      "title": "中部電 不正関わった社員6人処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604080?source=rss",
      "publishedAt": "2026-11-26T07:37:47.000Z",
      "xQuery": "中部電 不正関わった社員6人処分"
    },
    {
      "time": "16:16",
      "title": "補正予算でガソリン補助継続 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604071?source=rss",
      "publishedAt": "2026-11-26T07:16:32.000Z",
      "xQuery": "補正予算でガソリン補助継続 政府"
    },
    {
      "time": "15:19",
      "title": "香港高層住宅火災1年 遺族の憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604069?source=rss",
      "publishedAt": "2026-11-26T06:19:56.000Z",
      "xQuery": "香港高層住宅火災1年 遺族の憤り"
    },
    {
      "time": "16:39",
      "title": "記者拘束 妻が手記で早期解放訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604076?source=rss",
      "publishedAt": "2026-11-26T07:39:17.000Z",
      "xQuery": "記者拘束 妻が手記で早期解放訴え"
    },
    {
      "time": "15:27",
      "title": "もう限界 カナリア諸島に移民殺到",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604068?source=rss",
      "publishedAt": "2026-11-26T06:27:34.000Z",
      "xQuery": "もう限界 カナリア諸島に移民殺到"
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
