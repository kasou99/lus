window.LUS_X_NEWS = {
  "updatedAt": "2026-10-31T07:35:17.800Z",
  "items": [
    {
      "time": "14:10",
      "title": "台風31号 11/4～小笠原諸島接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600811?source=rss",
      "publishedAt": "2026-10-31T05:10:27.000Z",
      "xQuery": "台風31号 11/4～小笠原諸島接近か"
    },
    {
      "time": "16:10",
      "title": "第2青函トンネル構想浮上 国交省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600828?source=rss",
      "publishedAt": "2026-10-31T07:10:55.000Z",
      "xQuery": "第2青函トンネル構想浮上 国交省"
    },
    {
      "time": "14:34",
      "title": "1日早朝 関東などISS観測好条件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600812?source=rss",
      "publishedAt": "2026-10-31T05:34:22.000Z",
      "xQuery": "1日早朝 関東などISS観測好条件"
    },
    {
      "time": "15:43",
      "title": "開かずの踏切廃止に住民反発 横浜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600824?source=rss",
      "publishedAt": "2026-10-31T06:43:16.000Z",
      "xQuery": "開かずの踏切廃止に住民反発 横浜"
    },
    {
      "time": "14:52",
      "title": "山に放され戻ったクマ 今回は駆除",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600818?source=rss",
      "publishedAt": "2026-10-31T05:52:15.000Z",
      "xQuery": "山に放され戻ったクマ 今回は駆除"
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
