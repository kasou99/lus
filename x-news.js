window.LUS_X_NEWS = {
  "updatedAt": "2026-11-12T07:35:56.061Z",
  "items": [
    {
      "time": "16:04",
      "title": "良品計画の社長 情報流出巡り謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602308?source=rss",
      "publishedAt": "2026-11-12T07:04:58.000Z",
      "xQuery": "良品計画の社長 情報流出巡り謝罪"
    },
    {
      "time": "12:09",
      "title": "ポスト高市の首相再選支持 相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602290?source=rss",
      "publishedAt": "2026-11-12T03:09:55.000Z",
      "xQuery": "ポスト高市の首相再選支持 相次ぐ"
    },
    {
      "time": "13:43",
      "title": "すかいらーくHDがShin-Shin買収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602300?source=rss",
      "publishedAt": "2026-11-12T04:43:45.000Z",
      "xQuery": "すかいらーくHDがShin-Shin買収"
    },
    {
      "time": "15:56",
      "title": "利根川に遺体 不明の14歳と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602307?source=rss",
      "publishedAt": "2026-11-12T06:56:04.000Z",
      "xQuery": "利根川に遺体 不明の14歳と判明"
    },
    {
      "time": "15:56",
      "title": "丸亀 かけうどんを390円に値下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602309?source=rss",
      "publishedAt": "2026-11-12T06:56:36.000Z",
      "xQuery": "丸亀 かけうどんを390円に値下げ"
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
