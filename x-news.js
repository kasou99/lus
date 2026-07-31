window.LUS_X_NEWS = {
  "updatedAt": "2026-07-31T06:05:17.971Z",
  "items": [
    {
      "time": "14:03",
      "title": "熊本地震 液状化被害拡大の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590019?source=rss",
      "publishedAt": "2026-07-31T05:03:03.000Z",
      "xQuery": "熊本地震 液状化被害拡大の恐れ"
    },
    {
      "time": "12:23",
      "title": "日銀 政策金利1.0%程度に据え置き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590011?source=rss",
      "publishedAt": "2026-07-31T03:23:48.000Z",
      "xQuery": "日銀 政策金利1.0%程度に据え置き"
    },
    {
      "time": "13:58",
      "title": "実家崩壊 避難所で暮らさない男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590020?source=rss",
      "publishedAt": "2026-07-31T04:58:28.000Z",
      "xQuery": "実家崩壊 避難所で暮らさない男性"
    },
    {
      "time": "14:19",
      "title": "煙突折れた日本製紙八代 9人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590022?source=rss",
      "publishedAt": "2026-07-31T05:19:00.000Z",
      "xQuery": "煙突折れた日本製紙八代 9人死亡"
    },
    {
      "time": "14:44",
      "title": "海保3千人超 日当を不正・誤請求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590025?source=rss",
      "publishedAt": "2026-07-31T05:44:06.000Z",
      "xQuery": "海保3千人超 日当を不正・誤請求"
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
