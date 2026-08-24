window.LUS_X_NEWS = {
  "updatedAt": "2026-08-24T12:48:55.526Z",
  "items": [
    {
      "time": "20:39",
      "title": "25日 熊本など40℃酷暑日予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592922?source=rss",
      "publishedAt": "2026-08-24T11:39:57.000Z",
      "xQuery": "25日 熊本など40℃酷暑日予想"
    },
    {
      "time": "19:59",
      "title": "ダークパターン 規制強化の方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592916?source=rss",
      "publishedAt": "2026-08-24T10:59:18.000Z",
      "xQuery": "ダークパターン 規制強化の方針"
    },
    {
      "time": "20:17",
      "title": "高2死亡 車に追われるバイク映る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592919?source=rss",
      "publishedAt": "2026-08-24T11:17:29.000Z",
      "xQuery": "高2死亡 車に追われるバイク映る"
    },
    {
      "time": "21:02",
      "title": "誤って裁判官1人で審理 本来は3人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592923?source=rss",
      "publishedAt": "2026-08-24T12:02:30.000Z",
      "xQuery": "誤って裁判官1人で審理 本来は3人"
    },
    {
      "time": "17:10",
      "title": "ドローン報道 BERGが楽天店撤退",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592893?source=rss",
      "publishedAt": "2026-08-24T08:10:46.000Z",
      "xQuery": "ドローン報道 BERGが楽天店撤退"
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
