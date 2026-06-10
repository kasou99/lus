window.LUS_X_NEWS = {
  "updatedAt": "2026-06-10T09:26:14.312Z",
  "items": [
    {
      "time": "16:49",
      "title": "皇族数確保策 立法府総意まとまる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583704?source=rss",
      "publishedAt": "2026-06-10T07:49:56.000Z",
      "xQuery": "皇族数確保策 立法府総意まとまる"
    },
    {
      "time": "17:18",
      "title": "ゲノム編集ベビー規制 国会審議へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583706?source=rss",
      "publishedAt": "2026-06-10T08:18:40.000Z",
      "xQuery": "ゲノム編集ベビー規制 国会審議へ"
    },
    {
      "time": "17:44",
      "title": "新名神事故 遺族が家族写真を公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583709?source=rss",
      "publishedAt": "2026-06-10T08:44:02.000Z",
      "xQuery": "新名神事故 遺族が家族写真を公開"
    },
    {
      "time": "16:25",
      "title": "中学校でスプレー噴射 10人超搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583701?source=rss",
      "publishedAt": "2026-06-10T07:25:04.000Z",
      "xQuery": "中学校でスプレー噴射 10人超搬送"
    },
    {
      "time": "17:13",
      "title": "トヨタ会長の役員報酬 21億円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583705?source=rss",
      "publishedAt": "2026-06-10T08:13:47.000Z",
      "xQuery": "トヨタ会長の役員報酬 21億円超"
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
