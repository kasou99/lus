window.LUS_X_NEWS = {
  "updatedAt": "2026-08-06T12:14:15.207Z",
  "items": [
    {
      "time": "20:22",
      "title": "台風13号は沖縄・奄美に接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590782?source=rss",
      "publishedAt": "2026-08-06T11:22:02.000Z",
      "xQuery": "台風13号は沖縄・奄美に接近 警戒"
    },
    {
      "time": "17:43",
      "title": "被爆した姉の遺体 1人で焼いた弟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590760?source=rss",
      "publishedAt": "2026-08-06T08:43:02.000Z",
      "xQuery": "被爆した姉の遺体 1人で焼いた弟"
    },
    {
      "time": "20:29",
      "title": "イオン爆発 ガス供給会社コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590785?source=rss",
      "publishedAt": "2026-08-06T11:29:28.000Z",
      "xQuery": "イオン爆発 ガス供給会社コメント"
    },
    {
      "time": "20:52",
      "title": "3年で2.6億円 福岡県議会海外視察",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590788?source=rss",
      "publishedAt": "2026-08-06T11:52:25.000Z",
      "xQuery": "3年で2.6億円 福岡県議会海外視察"
    },
    {
      "time": "18:53",
      "title": "エース級の財務官僚人事が波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590778?source=rss",
      "publishedAt": "2026-08-06T09:53:40.000Z",
      "xQuery": "エース級の財務官僚人事が波紋"
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
