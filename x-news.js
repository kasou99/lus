window.LUS_X_NEWS = {
  "updatedAt": "2026-07-28T07:25:42.159Z",
  "items": [
    {
      "time": "15:52",
      "title": "東証大幅反落 終値は6万2364円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589631?source=rss",
      "publishedAt": "2026-07-28T06:52:03.000Z",
      "xQuery": "東証大幅反落 終値は6万2364円"
    },
    {
      "time": "14:27",
      "title": "子のSNS利用に年齢制限 議論へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589626?source=rss",
      "publishedAt": "2026-07-28T05:27:03.000Z",
      "xQuery": "子のSNS利用に年齢制限 議論へ"
    },
    {
      "time": "16:14",
      "title": "Apple時価総額 世界首位返り咲き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589632?source=rss",
      "publishedAt": "2026-07-28T07:14:16.000Z",
      "xQuery": "Apple時価総額 世界首位返り咲き"
    },
    {
      "time": "15:27",
      "title": "給食にねじ 保育士が吐き出させる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589629?source=rss",
      "publishedAt": "2026-07-28T06:27:27.000Z",
      "xQuery": "給食にねじ 保育士が吐き出させる"
    },
    {
      "time": "12:28",
      "title": "老後に焦り「おひとりさま」本音",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589611?source=rss",
      "publishedAt": "2026-07-28T03:28:00.000Z",
      "xQuery": "老後に焦り「おひとりさま」本音"
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
