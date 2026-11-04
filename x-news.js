window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T23:35:25.900Z",
  "items": [
    {
      "time": "07:35",
      "title": "米民主党 トランプ政権監視強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601374?source=rss",
      "publishedAt": "2026-11-04T22:35:38.000Z",
      "xQuery": "米民主党 トランプ政権監視強化へ"
    },
    {
      "time": "08:01",
      "title": "消費税減税 あすにも衆院通過へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601376?source=rss",
      "publishedAt": "2026-11-04T23:01:06.000Z",
      "xQuery": "消費税減税 あすにも衆院通過へ"
    },
    {
      "time": "07:19",
      "title": "「書道」無形文化遺産に登録へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601371?source=rss",
      "publishedAt": "2026-11-04T22:19:22.000Z",
      "xQuery": "「書道」無形文化遺産に登録へ"
    },
    {
      "time": "07:35",
      "title": "ダウ一時1500ドル高 選挙から一夜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601373?source=rss",
      "publishedAt": "2026-11-04T22:35:29.000Z",
      "xQuery": "ダウ一時1500ドル高 選挙から一夜"
    },
    {
      "time": "08:22",
      "title": "幹部逮捕 川崎市役所を家宅捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601377?source=rss",
      "publishedAt": "2026-11-04T23:22:44.000Z",
      "xQuery": "幹部逮捕 川崎市役所を家宅捜索"
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
