window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T13:36:04.732Z",
  "items": [
    {
      "time": "21:31",
      "title": "安保3文書素案 原潜「検討着手」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603335?source=rss",
      "publishedAt": "2026-11-20T12:31:19.000Z",
      "xQuery": "安保3文書素案 原潜「検討着手」"
    },
    {
      "time": "22:18",
      "title": "神戸市 マンション空室税の条例案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603341?source=rss",
      "publishedAt": "2026-11-20T13:18:38.000Z",
      "xQuery": "神戸市 マンション空室税の条例案"
    },
    {
      "time": "22:23",
      "title": "ポーランドに巡航ミサイル着弾",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603342?source=rss",
      "publishedAt": "2026-11-20T13:23:51.000Z",
      "xQuery": "ポーランドに巡航ミサイル着弾"
    },
    {
      "time": "21:02",
      "title": "自民党で関文科相の辞任論が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603332?source=rss",
      "publishedAt": "2026-11-20T12:02:20.000Z",
      "xQuery": "自民党で関文科相の辞任論が浮上"
    },
    {
      "time": "22:09",
      "title": "「KARTE」情報漏えい延べ2200社",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603339?source=rss",
      "publishedAt": "2026-11-20T13:09:47.000Z",
      "xQuery": "「KARTE」情報漏えい延べ2200社"
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
