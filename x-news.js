window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T07:43:55.191Z",
  "items": [
    {
      "time": "16:21",
      "title": "衆院選1票の格差 「合憲」11件目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583050?source=rss",
      "publishedAt": "2026-06-05T07:21:10.000Z",
      "xQuery": "衆院選1票の格差 「合憲」11件目"
    },
    {
      "time": "15:26",
      "title": "栃木 強盗殺人未遂疑い少年再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583045?source=rss",
      "publishedAt": "2026-06-05T06:26:30.000Z",
      "xQuery": "栃木 強盗殺人未遂疑い少年再逮捕"
    },
    {
      "time": "14:29",
      "title": "被告が急に暴れ出す 裁判は休廷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583040?source=rss",
      "publishedAt": "2026-06-05T05:29:59.000Z",
      "xQuery": "被告が急に暴れ出す 裁判は休廷"
    },
    {
      "time": "15:51",
      "title": "中野サンプラザ解体 専門家が異議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583047?source=rss",
      "publishedAt": "2026-06-05T06:51:37.000Z",
      "xQuery": "中野サンプラザ解体 専門家が異議"
    },
    {
      "time": "15:16",
      "title": "衣類激安 オフプライスストアとは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583043?source=rss",
      "publishedAt": "2026-06-05T06:16:23.000Z",
      "xQuery": "衣類激安 オフプライスストアとは"
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
