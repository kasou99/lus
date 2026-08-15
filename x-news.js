window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T03:18:08.655Z",
  "items": [
    {
      "time": "11:40",
      "title": "中継 終戦81年の全国戦没者追悼式",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591791?source=rss",
      "publishedAt": "2026-08-15T02:40:21.000Z",
      "xQuery": "中継 終戦81年の全国戦没者追悼式"
    },
    {
      "time": "11:35",
      "title": "「死にに帰った」同級生 空襲犠牲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591797?source=rss",
      "publishedAt": "2026-08-15T02:35:23.000Z",
      "xQuery": "「死にに帰った」同級生 空襲犠牲"
    },
    {
      "time": "11:52",
      "title": "インドネシアM7.7倒壊で2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591798?source=rss",
      "publishedAt": "2026-08-15T02:52:44.000Z",
      "xQuery": "インドネシアM7.7倒壊で2人死亡"
    },
    {
      "time": "09:06",
      "title": "病院敷地に遺体遺棄疑い 3人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591777?source=rss",
      "publishedAt": "2026-08-15T00:06:44.000Z",
      "xQuery": "病院敷地に遺体遺棄疑い 3人逮捕"
    },
    {
      "time": "09:58",
      "title": "一緒にいたくて 冷凍庫に子を遺棄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591788?source=rss",
      "publishedAt": "2026-08-15T00:58:11.000Z",
      "xQuery": "一緒にいたくて 冷凍庫に子を遺棄"
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
