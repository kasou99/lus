window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T20:34:17.460Z",
  "items": [
    {
      "time": "22:58",
      "title": "日本産水産物規制 韓国に協議打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583351?source=rss",
      "publishedAt": "2026-06-07T13:58:48.000Z",
      "xQuery": "日本産水産物規制 韓国に協議打診"
    },
    {
      "time": "22:34",
      "title": "8日訪朝の習主席 非核化言及焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583349?source=rss",
      "publishedAt": "2026-06-07T13:34:03.000Z",
      "xQuery": "8日訪朝の習主席 非核化言及焦点"
    },
    {
      "time": "21:37",
      "title": "京都男児殺害 報道過熱していたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583343?source=rss",
      "publishedAt": "2026-06-07T12:37:09.000Z",
      "xQuery": "京都男児殺害 報道過熱していたか"
    },
    {
      "time": "21:57",
      "title": "名古屋死亡ひき逃げ事件 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583345?source=rss",
      "publishedAt": "2026-06-07T12:57:49.000Z",
      "xQuery": "名古屋死亡ひき逃げ事件 男を逮捕"
    },
    {
      "time": "23:12",
      "title": "登山男性「遭難」と気付かず 救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583352?source=rss",
      "publishedAt": "2026-06-07T14:12:41.000Z",
      "xQuery": "登山男性「遭難」と気付かず 救助"
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
