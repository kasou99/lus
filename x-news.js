window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T10:36:19.322Z",
  "items": [
    {
      "time": "19:12",
      "title": "野党 24日にも文科相問責案を協議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603704?source=rss",
      "publishedAt": "2026-11-23T10:12:28.000Z",
      "xQuery": "野党 24日にも文科相問責案を協議"
    },
    {
      "time": "17:33",
      "title": "首里城正殿が一般公開 来場者感嘆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603691?source=rss",
      "publishedAt": "2026-11-23T08:33:05.000Z",
      "xQuery": "首里城正殿が一般公開 来場者感嘆"
    },
    {
      "time": "19:12",
      "title": "ウがリビア沖で露軍艦を「撃沈」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603703?source=rss",
      "publishedAt": "2026-11-23T10:12:22.000Z",
      "xQuery": "ウがリビア沖で露軍艦を「撃沈」"
    },
    {
      "time": "16:50",
      "title": "ガソリン価格下落 米大統領恨み節",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603686?source=rss",
      "publishedAt": "2026-11-23T07:50:15.000Z",
      "xQuery": "ガソリン価格下落 米大統領恨み節"
    },
    {
      "time": "18:53",
      "title": "タッチ決済改札 利用者が戸惑いも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603699?source=rss",
      "publishedAt": "2026-11-23T09:53:19.000Z",
      "xQuery": "タッチ決済改札 利用者が戸惑いも"
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
