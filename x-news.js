window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T21:38:24.673Z",
  "items": [
    {
      "time": "05:57",
      "title": "道新記者をサハリンで拘束 露当局",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598670?source=rss",
      "publishedAt": "2026-10-13T20:57:07.000Z",
      "xQuery": "道新記者をサハリンで拘束 露当局"
    },
    {
      "time": "00:09",
      "title": "首相 14日に簗氏と面会する意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598668?source=rss",
      "publishedAt": "2026-10-13T15:09:03.000Z",
      "xQuery": "首相 14日に簗氏と面会する意向"
    },
    {
      "time": "23:25",
      "title": "日本のGDP 来年世界6位の見込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598666?source=rss",
      "publishedAt": "2026-10-13T14:25:23.000Z",
      "xQuery": "日本のGDP 来年世界6位の見込み"
    },
    {
      "time": "22:44",
      "title": "無免許運転か 車突っ込み男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598663?source=rss",
      "publishedAt": "2026-10-13T13:44:13.000Z",
      "xQuery": "無免許運転か 車突っ込み男性死亡"
    },
    {
      "time": "23:54",
      "title": "Apple 新端末「HomeView」発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598667?source=rss",
      "publishedAt": "2026-10-13T14:54:47.000Z",
      "xQuery": "Apple 新端末「HomeView」発表"
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
