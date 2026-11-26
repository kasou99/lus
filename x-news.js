window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T09:35:35.420Z",
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
      "time": "17:31",
      "title": "井林国交相 企業から違法献金疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604085?source=rss",
      "publishedAt": "2026-11-26T08:31:52.000Z",
      "xQuery": "井林国交相 企業から違法献金疑い"
    },
    {
      "time": "17:37",
      "title": "不登校の小中学生 最多の35.9万人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604086?source=rss",
      "publishedAt": "2026-11-26T08:37:45.000Z",
      "xQuery": "不登校の小中学生 最多の35.9万人"
    },
    {
      "time": "15:27",
      "title": "もう限界 カナリア諸島に移民殺到",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604068?source=rss",
      "publishedAt": "2026-11-26T06:27:34.000Z",
      "xQuery": "もう限界 カナリア諸島に移民殺到"
    },
    {
      "time": "16:49",
      "title": "遠足で女児が熱中症 市に逆転勝訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604074?source=rss",
      "publishedAt": "2026-11-26T07:49:28.000Z",
      "xQuery": "遠足で女児が熱中症 市に逆転勝訴"
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
