window.LUS_X_NEWS = {
  "updatedAt": "2026-11-25T08:36:17.635Z",
  "items": [
    {
      "time": "16:18",
      "title": "オンライン賭博の判事に罷免判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603934?source=rss",
      "publishedAt": "2026-11-25T07:18:08.000Z",
      "xQuery": "オンライン賭博の判事に罷免判決"
    },
    {
      "time": "15:19",
      "title": "福岡市で刺された男性死亡 男逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603926?source=rss",
      "publishedAt": "2026-11-25T06:19:28.000Z",
      "xQuery": "福岡市で刺された男性死亡 男逃走"
    },
    {
      "time": "16:59",
      "title": "プルデンシャル 新規契約が92%減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603940?source=rss",
      "publishedAt": "2026-11-25T07:59:22.000Z",
      "xQuery": "プルデンシャル 新規契約が92%減"
    },
    {
      "time": "17:30",
      "title": "クマ巡る抗議 前橋市役所に数百件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603945?source=rss",
      "publishedAt": "2026-11-25T08:30:54.000Z",
      "xQuery": "クマ巡る抗議 前橋市役所に数百件"
    },
    {
      "time": "15:58",
      "title": "妻殺害した疑い 医師の男を再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603929?source=rss",
      "publishedAt": "2026-11-25T06:58:10.000Z",
      "xQuery": "妻殺害した疑い 医師の男を再逮捕"
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
