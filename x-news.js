window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T06:04:23.112Z",
  "items": [
    {
      "time": "13:06",
      "title": "飛鳥・藤原 首相「世界の宝に」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589366?source=rss",
      "publishedAt": "2026-07-26T04:06:25.000Z",
      "xQuery": "飛鳥・藤原 首相「世界の宝に」"
    },
    {
      "time": "11:53",
      "title": "日中外相接触 関係改善の道険しく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589358?source=rss",
      "publishedAt": "2026-07-26T02:53:39.000Z",
      "xQuery": "日中外相接触 関係改善の道険しく"
    },
    {
      "time": "14:02",
      "title": "「不登校離職」母は父の30倍 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589374?source=rss",
      "publishedAt": "2026-07-26T05:02:27.000Z",
      "xQuery": "「不登校離職」母は父の30倍 調査"
    },
    {
      "time": "14:09",
      "title": "親子ら3人海に流され父死亡 茨城",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589375?source=rss",
      "publishedAt": "2026-07-26T05:09:38.000Z",
      "xQuery": "親子ら3人海に流され父死亡 茨城"
    },
    {
      "time": "14:03",
      "title": "Joshin導入「ピース」で勤怠打刻",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589372?source=rss",
      "publishedAt": "2026-07-26T05:03:58.000Z",
      "xQuery": "Joshin導入「ピース」で勤怠打刻"
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
