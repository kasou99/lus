window.LUS_X_NEWS = {
  "updatedAt": "2026-09-09T11:37:03.903Z",
  "items": [
    {
      "time": "18:12",
      "title": "東海や関東 9日夜にかけ大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594772?source=rss",
      "publishedAt": "2026-09-09T09:12:05.000Z",
      "xQuery": "東海や関東 9日夜にかけ大雨恐れ"
    },
    {
      "time": "15:31",
      "title": "能登地震関連死 新たに3人認定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594750?source=rss",
      "publishedAt": "2026-09-09T06:31:11.000Z",
      "xQuery": "能登地震関連死 新たに3人認定へ"
    },
    {
      "time": "20:00",
      "title": "中道 未交付の11億円で債務返済へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594778?source=rss",
      "publishedAt": "2026-09-09T11:00:40.000Z",
      "xQuery": "中道 未交付の11億円で債務返済へ"
    },
    {
      "time": "17:55",
      "title": "母死亡 熱湯かけた疑いで息子逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594770?source=rss",
      "publishedAt": "2026-09-09T08:55:26.000Z",
      "xQuery": "母死亡 熱湯かけた疑いで息子逮捕"
    },
    {
      "time": "19:29",
      "title": "6歳不明 防カメに似た服装の児童",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594776?source=rss",
      "publishedAt": "2026-09-09T10:29:29.000Z",
      "xQuery": "6歳不明 防カメに似た服装の児童"
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
