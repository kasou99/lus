window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T23:36:53.948Z",
  "items": [
    {
      "time": "08:13",
      "title": "逮捕状の「電子令状」4都県から",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599313?source=rss",
      "publishedAt": "2026-10-18T23:13:34.000Z",
      "xQuery": "逮捕状の「電子令状」4都県から"
    },
    {
      "time": "06:59",
      "title": "フランス各地で暴動 2400人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599304?source=rss",
      "publishedAt": "2026-10-18T21:59:51.000Z",
      "xQuery": "フランス各地で暴動 2400人逮捕"
    },
    {
      "time": "07:36",
      "title": "横浜前市長 パワハラに厳しい審判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599310?source=rss",
      "publishedAt": "2026-10-18T22:36:29.000Z",
      "xQuery": "横浜前市長 パワハラに厳しい審判"
    },
    {
      "time": "07:16",
      "title": "サイバー攻撃 なぜ日本が狙われる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599306?source=rss",
      "publishedAt": "2026-10-18T22:16:37.000Z",
      "xQuery": "サイバー攻撃 なぜ日本が狙われる"
    },
    {
      "time": "08:04",
      "title": "東芝 難関大生から再評価される今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599312?source=rss",
      "publishedAt": "2026-10-18T23:04:39.000Z",
      "xQuery": "東芝 難関大生から再評価される今"
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
