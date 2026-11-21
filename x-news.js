window.LUS_X_NEWS = {
  "updatedAt": "2026-11-21T08:35:45.973Z",
  "items": [
    {
      "time": "15:31",
      "title": "文科相交代の可能性示唆 自民党",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603410?source=rss",
      "publishedAt": "2026-11-21T06:31:42.000Z",
      "xQuery": "文科相交代の可能性示唆 自民党"
    },
    {
      "time": "15:14",
      "title": "大雪影響で千人超が孤立状態 福島",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603404?source=rss",
      "publishedAt": "2026-11-21T06:14:38.000Z",
      "xQuery": "大雪影響で千人超が孤立状態 福島"
    },
    {
      "time": "14:47",
      "title": "デンマークで暗殺阻止 露が計画か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603402?source=rss",
      "publishedAt": "2026-11-21T05:47:10.000Z",
      "xQuery": "デンマークで暗殺阻止 露が計画か"
    },
    {
      "time": "16:27",
      "title": "預金1億円超個人口座 00年比3.6倍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603415?source=rss",
      "publishedAt": "2026-11-21T07:27:49.000Z",
      "xQuery": "預金1億円超個人口座 00年比3.6倍"
    },
    {
      "time": "17:01",
      "title": "道路横断中 除雪車にはねられ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603423?source=rss",
      "publishedAt": "2026-11-21T08:01:30.000Z",
      "xQuery": "道路横断中 除雪車にはねられ死亡"
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
