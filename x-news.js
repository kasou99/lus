window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T19:52:09.997Z",
  "items": [
    {
      "time": "00:00",
      "title": "千葉県の大雨特別警報 エリア拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591641?source=rss",
      "publishedAt": "2026-08-13T15:00:11.000Z",
      "xQuery": "千葉県の大雨特別警報 エリア拡大"
    },
    {
      "time": "00:07",
      "title": "千葉県に土砂災害特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591642?source=rss",
      "publishedAt": "2026-08-13T15:07:54.000Z",
      "xQuery": "千葉県に土砂災害特別警報"
    },
    {
      "time": "19:41",
      "title": "安全確保を 大雨のときのNG行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589507?source=rss",
      "publishedAt": "2026-08-13T10:41:24.000Z",
      "xQuery": "安全確保を 大雨のときのNG行動"
    },
    {
      "time": "21:12",
      "title": "千葉県に大雨特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591623?source=rss",
      "publishedAt": "2026-08-13T12:12:09.000Z",
      "xQuery": "千葉県に大雨特別警報 最新情報"
    },
    {
      "time": "04:46",
      "title": "千葉県内のJR各線 始発から運休",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591646?source=rss",
      "publishedAt": "2026-08-13T19:46:02.000Z",
      "xQuery": "千葉県内のJR各線 始発から運休"
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
