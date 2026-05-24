window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T02:25:26.044Z",
  "items": [
    {
      "time": "10:48",
      "title": "ホワイトハウス周辺発砲 市民負傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581466?source=rss",
      "publishedAt": "2026-05-24T01:48:24.000Z",
      "xQuery": "ホワイトハウス周辺発砲 市民負傷"
    },
    {
      "time": "08:14",
      "title": "エボラ 米の支援削減で初動遅れか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581447?source=rss",
      "publishedAt": "2026-05-23T23:14:40.000Z",
      "xQuery": "エボラ 米の支援削減で初動遅れか"
    },
    {
      "time": "10:33",
      "title": "闇バイトの実態語る 服役の元少年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581464?source=rss",
      "publishedAt": "2026-05-24T01:33:28.000Z",
      "xQuery": "闇バイトの実態語る 服役の元少年"
    },
    {
      "time": "11:15",
      "title": "動物園職員 数カ月前から絞殺検索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581469?source=rss",
      "publishedAt": "2026-05-24T02:15:27.000Z",
      "xQuery": "動物園職員 数カ月前から絞殺検索"
    },
    {
      "time": "08:53",
      "title": "バインミー専門店が増加 なぜ人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581452?source=rss",
      "publishedAt": "2026-05-23T23:53:13.000Z",
      "xQuery": "バインミー専門店が増加 なぜ人気"
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
