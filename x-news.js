window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T16:12:20.994Z",
  "items": [
    {
      "time": "00:03",
      "title": "米10月雇用16.5万人増 予想上回る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601587?source=rss",
      "publishedAt": "2026-11-06T15:03:11.000Z",
      "xQuery": "米10月雇用16.5万人増 予想上回る"
    },
    {
      "time": "21:06",
      "title": "石破氏ら採決退席 首相言及控える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601568?source=rss",
      "publishedAt": "2026-11-06T12:06:05.000Z",
      "xQuery": "石破氏ら採決退席 首相言及控える"
    },
    {
      "time": "20:35",
      "title": "ドコモ 流出の対象者に見舞金検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601566?source=rss",
      "publishedAt": "2026-11-06T11:35:39.000Z",
      "xQuery": "ドコモ 流出の対象者に見舞金検討"
    },
    {
      "time": "22:44",
      "title": "KDDI社長 決算会見で2つのおわび",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601580?source=rss",
      "publishedAt": "2026-11-06T13:44:06.000Z",
      "xQuery": "KDDI社長 決算会見で2つのおわび"
    },
    {
      "time": "23:17",
      "title": "池袋女性刺殺 容疑者死亡で不起訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601583?source=rss",
      "publishedAt": "2026-11-06T14:17:53.000Z",
      "xQuery": "池袋女性刺殺 容疑者死亡で不起訴"
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
