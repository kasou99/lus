window.LUS_X_NEWS = {
  "updatedAt": "2026-10-10T11:39:46.351Z",
  "items": [
    {
      "time": "18:04",
      "title": "いい迷惑 農相に地元から苦言続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598280?source=rss",
      "publishedAt": "2026-10-10T09:04:06.000Z",
      "xQuery": "いい迷惑 農相に地元から苦言続出"
    },
    {
      "time": "19:32",
      "title": "米長官 ICCの「資金源断ちきる」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598289?source=rss",
      "publishedAt": "2026-10-10T10:32:26.000Z",
      "xQuery": "米長官 ICCの「資金源断ちきる」"
    },
    {
      "time": "18:33",
      "title": "対向車線にバイク入る 衝突し死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598283?source=rss",
      "publishedAt": "2026-10-10T09:33:24.000Z",
      "xQuery": "対向車線にバイク入る 衝突し死亡"
    },
    {
      "time": "20:14",
      "title": "「日本一遅い列車」37年歴史に幕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598293?source=rss",
      "publishedAt": "2026-10-10T11:14:39.000Z",
      "xQuery": "「日本一遅い列車」37年歴史に幕"
    },
    {
      "time": "18:10",
      "title": "年収2千万円ざら 稼ぐミカン農家",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598278?source=rss",
      "publishedAt": "2026-10-10T09:10:38.000Z",
      "xQuery": "年収2千万円ざら 稼ぐミカン農家"
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
