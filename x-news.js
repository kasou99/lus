window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T22:09:21.749Z",
  "items": [
    {
      "time": "23:25",
      "title": "農相政治団体 寄付3000万円不記載",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601002?source=rss",
      "publishedAt": "2026-11-01T14:25:40.000Z",
      "xQuery": "農相政治団体 寄付3000万円不記載"
    },
    {
      "time": "21:18",
      "title": "GMO攻撃 北朝鮮系のハッカーか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600991?source=rss",
      "publishedAt": "2026-11-01T12:18:46.000Z",
      "xQuery": "GMO攻撃 北朝鮮系のハッカーか"
    },
    {
      "time": "21:59",
      "title": "望月衣塑子記者の対談本 回収へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600996?source=rss",
      "publishedAt": "2026-11-01T12:59:35.000Z",
      "xQuery": "望月衣塑子記者の対談本 回収へ"
    },
    {
      "time": "06:56",
      "title": "早期流産うち明けず「12週の壁」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601007?source=rss",
      "publishedAt": "2026-11-01T21:56:45.000Z",
      "xQuery": "早期流産うち明けず「12週の壁」"
    },
    {
      "time": "23:53",
      "title": "38歳で余命宣告 子への優しいうそ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601003?source=rss",
      "publishedAt": "2026-11-01T14:53:14.000Z",
      "xQuery": "38歳で余命宣告 子への優しいうそ"
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
