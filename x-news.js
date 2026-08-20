window.LUS_X_NEWS = {
  "updatedAt": "2026-08-20T08:16:13.271Z",
  "items": [
    {
      "time": "16:53",
      "title": "77人犠牲 広島土砂災害から12年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592420?source=rss",
      "publishedAt": "2026-08-20T07:53:35.000Z",
      "xQuery": "77人犠牲 広島土砂災害から12年"
    },
    {
      "time": "16:49",
      "title": "イオン 爆発巡り事故調査委を発足",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592419?source=rss",
      "publishedAt": "2026-08-20T07:49:23.000Z",
      "xQuery": "イオン 爆発巡り事故調査委を発足"
    },
    {
      "time": "16:40",
      "title": "4人死亡 見張り役が列車に合図",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592417?source=rss",
      "publishedAt": "2026-08-20T07:40:58.000Z",
      "xQuery": "4人死亡 見張り役が列車に合図"
    },
    {
      "time": "16:20",
      "title": "北の核弾頭は80-120発 韓国国防相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592412?source=rss",
      "publishedAt": "2026-08-20T07:20:31.000Z",
      "xQuery": "北の核弾頭は80-120発 韓国国防相"
    },
    {
      "time": "16:39",
      "title": "山口組と池田組の特定抗争解除へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592416?source=rss",
      "publishedAt": "2026-08-20T07:39:58.000Z",
      "xQuery": "山口組と池田組の特定抗争解除へ"
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
