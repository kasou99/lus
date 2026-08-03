window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T21:28:49.982Z",
  "items": [
    {
      "time": "22:47",
      "title": "米大統領 対イラン発言は二転三転",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590431?source=rss",
      "publishedAt": "2026-08-03T13:47:24.000Z",
      "xQuery": "米大統領 対イラン発言は二転三転"
    },
    {
      "time": "20:22",
      "title": "車両集中 地震の復旧阻む大渋滞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590413?source=rss",
      "publishedAt": "2026-08-03T11:22:39.000Z",
      "xQuery": "車両集中 地震の復旧阻む大渋滞"
    },
    {
      "time": "06:26",
      "title": "ウ大統領 対日関係の強化を指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590442?source=rss",
      "publishedAt": "2026-08-03T21:26:27.000Z",
      "xQuery": "ウ大統領 対日関係の強化を指示"
    },
    {
      "time": "23:04",
      "title": "地震で家倒壊 避難直後に盗難被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590433?source=rss",
      "publishedAt": "2026-08-03T14:04:22.000Z",
      "xQuery": "地震で家倒壊 避難直後に盗難被害"
    },
    {
      "time": "06:05",
      "title": "マンション火災で12人けが 小金井",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590440?source=rss",
      "publishedAt": "2026-08-03T21:05:59.000Z",
      "xQuery": "マンション火災で12人けが 小金井"
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
