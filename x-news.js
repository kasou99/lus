window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T09:43:06.234Z",
  "items": [
    {
      "time": "16:06",
      "title": "那覇強殺 米国務長官が哀悼の意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598382?source=rss",
      "publishedAt": "2026-10-11T07:06:35.000Z",
      "xQuery": "那覇強殺 米国務長官が哀悼の意"
    },
    {
      "time": "16:12",
      "title": "「予算カット」市町 工事先送りも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598383?source=rss",
      "publishedAt": "2026-10-11T07:12:05.000Z",
      "xQuery": "「予算カット」市町 工事先送りも"
    },
    {
      "time": "16:50",
      "title": "新築の平屋率が増加 耐震性に注目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598387?source=rss",
      "publishedAt": "2026-10-11T07:50:06.000Z",
      "xQuery": "新築の平屋率が増加 耐震性に注目"
    },
    {
      "time": "18:08",
      "title": "木曽川で泳ぎ溺れる 25歳男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598403?source=rss",
      "publishedAt": "2026-10-11T09:08:22.000Z",
      "xQuery": "木曽川で泳ぎ溺れる 25歳男性死亡"
    },
    {
      "time": "10:09",
      "title": "動物公園でトラに襲われ死亡 英",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598340?source=rss",
      "publishedAt": "2026-10-11T01:09:51.000Z",
      "xQuery": "動物公園でトラに襲われ死亡 英"
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
