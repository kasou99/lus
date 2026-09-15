window.LUS_X_NEWS = {
  "updatedAt": "2026-09-15T06:31:50.086Z",
  "items": [
    {
      "time": "14:08",
      "title": "米 対イラン作戦で深刻な弾薬不足",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595363?source=rss",
      "publishedAt": "2026-09-15T05:08:37.000Z",
      "xQuery": "米 対イラン作戦で深刻な弾薬不足"
    },
    {
      "time": "14:09",
      "title": "金融庁 ソニー生命に立ち入り検査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595362?source=rss",
      "publishedAt": "2026-09-15T05:09:46.000Z",
      "xQuery": "金融庁 ソニー生命に立ち入り検査"
    },
    {
      "time": "15:13",
      "title": "マンションから男児転落 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595369?source=rss",
      "publishedAt": "2026-09-15T06:13:19.000Z",
      "xQuery": "マンションから男児転落 意識不明"
    },
    {
      "time": "13:36",
      "title": "米MS 行動規範で「AIより人間」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595359?source=rss",
      "publishedAt": "2026-09-15T04:36:49.000Z",
      "xQuery": "米MS 行動規範で「AIより人間」"
    },
    {
      "time": "14:24",
      "title": "12歳タイ少女人身取引 男実刑判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595366?source=rss",
      "publishedAt": "2026-09-15T05:24:39.000Z",
      "xQuery": "12歳タイ少女人身取引 男実刑判決"
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
