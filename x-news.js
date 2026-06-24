window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T23:32:06.940Z",
  "items": [
    {
      "time": "07:44",
      "title": "青森県で震度6強 津波の心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585549?source=rss",
      "publishedAt": "2026-06-24T22:44:51.000Z",
      "xQuery": "青森県で震度6強 津波の心配なし"
    },
    {
      "time": "08:27",
      "title": "後発地震情報 気象庁が評価開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585557?source=rss",
      "publishedAt": "2026-06-24T23:27:13.000Z",
      "xQuery": "後発地震情報 気象庁が評価開始"
    },
    {
      "time": "07:54",
      "title": "青森県で震度6強 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585550?source=rss",
      "publishedAt": "2026-06-24T22:54:27.000Z",
      "xQuery": "青森県で震度6強 最新情報"
    },
    {
      "time": "08:16",
      "title": "青森県で震度6強 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585556?source=rss",
      "publishedAt": "2026-06-24T23:16:08.000Z",
      "xQuery": "青森県で震度6強 現地のSNS投稿"
    },
    {
      "time": "07:22",
      "title": "九州北部 災害級の大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585546?source=rss",
      "publishedAt": "2026-06-24T22:22:12.000Z",
      "xQuery": "九州北部 災害級の大雨の恐れ"
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
