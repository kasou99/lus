window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T00:57:26.022Z",
  "items": [
    {
      "time": "09:32",
      "title": "熱海土石流5年 盛り土責任の所在",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586553?source=rss",
      "publishedAt": "2026-07-03T00:32:27.000Z",
      "xQuery": "熱海土石流5年 盛り土責任の所在"
    },
    {
      "time": "09:24",
      "title": "長期金利一時2.81% 97年5月以来",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586552?source=rss",
      "publishedAt": "2026-07-03T00:24:49.000Z",
      "xQuery": "長期金利一時2.81% 97年5月以来"
    },
    {
      "time": "08:24",
      "title": "テスラ世界納車25%増 第2四半期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586546?source=rss",
      "publishedAt": "2026-07-02T23:24:26.000Z",
      "xQuery": "テスラ世界納車25%増 第2四半期"
    },
    {
      "time": "07:33",
      "title": "渋谷の危険盛り土 告発状を受理",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586540?source=rss",
      "publishedAt": "2026-07-02T22:33:58.000Z",
      "xQuery": "渋谷の危険盛り土 告発状を受理"
    },
    {
      "time": "09:23",
      "title": "ジャングリアの駐車場 県民無料に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586551?source=rss",
      "publishedAt": "2026-07-03T00:23:19.000Z",
      "xQuery": "ジャングリアの駐車場 県民無料に"
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
