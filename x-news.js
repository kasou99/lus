window.LUS_X_NEWS = {
  "updatedAt": "2026-06-28T21:56:52.098Z",
  "items": [
    {
      "time": "20:52",
      "title": "日韓防衛相会談 AIなど連携強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586034?source=rss",
      "publishedAt": "2026-06-28T11:52:39.000Z",
      "xQuery": "日韓防衛相会談 AIなど連携強化へ"
    },
    {
      "time": "22:54",
      "title": "露兵器に日本企業の部品 ウ指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586042?source=rss",
      "publishedAt": "2026-06-28T13:54:56.000Z",
      "xQuery": "露兵器に日本企業の部品 ウ指摘"
    },
    {
      "time": "06:27",
      "title": "近鉄京都駅構内 普通列車が脱線",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586052?source=rss",
      "publishedAt": "2026-06-28T21:27:57.000Z",
      "xQuery": "近鉄京都駅構内 普通列車が脱線"
    },
    {
      "time": "06:49",
      "title": "別府ひき逃げ4年 県警新映像公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586053?source=rss",
      "publishedAt": "2026-06-28T21:49:11.000Z",
      "xQuery": "別府ひき逃げ4年 県警新映像公開"
    },
    {
      "time": "21:55",
      "title": "車が店に突っ込む 巻き込まれ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586038?source=rss",
      "publishedAt": "2026-06-28T12:55:19.000Z",
      "xQuery": "車が店に突っ込む 巻き込まれ死亡"
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
