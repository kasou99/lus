window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T23:13:17.077Z",
  "items": [
    {
      "time": "07:23",
      "title": "広く大気不安定 天気の急変に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599308?source=rss",
      "publishedAt": "2026-10-18T22:23:22.000Z",
      "xQuery": "広く大気不安定 天気の急変に注意"
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
      "time": "06:46",
      "title": "新品畳に子が「臭い」畳店の思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599303?source=rss",
      "publishedAt": "2026-10-18T21:46:09.000Z",
      "xQuery": "新品畳に子が「臭い」畳店の思い"
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
