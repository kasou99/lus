window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T07:37:56.685Z",
  "items": [
    {
      "time": "15:22",
      "title": "ホルムズ タンカー2隻が「爆発」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588633?source=rss",
      "publishedAt": "2026-07-20T06:22:44.000Z",
      "xQuery": "ホルムズ タンカー2隻が「爆発」"
    },
    {
      "time": "15:02",
      "title": "人身売買罪の適用低調 立件難しく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588629?source=rss",
      "publishedAt": "2026-07-20T06:02:40.000Z",
      "xQuery": "人身売買罪の適用低調 立件難しく"
    },
    {
      "time": "14:57",
      "title": "姫路の殺人事件 新たに男2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588630?source=rss",
      "publishedAt": "2026-07-20T05:57:34.000Z",
      "xQuery": "姫路の殺人事件 新たに男2人逮捕"
    },
    {
      "time": "15:47",
      "title": "クマ3頭と遭遇 スコップで頭叩く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588636?source=rss",
      "publishedAt": "2026-07-20T06:47:45.000Z",
      "xQuery": "クマ3頭と遭遇 スコップで頭叩く"
    },
    {
      "time": "15:54",
      "title": "携帯「060」18カ月準備もなぜ延期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588635?source=rss",
      "publishedAt": "2026-07-20T06:54:33.000Z",
      "xQuery": "携帯「060」18カ月準備もなぜ延期"
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
