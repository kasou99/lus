window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T04:42:20.879Z",
  "items": [
    {
      "time": "12:00",
      "title": "台風が沖縄へ接近 影響長期化恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596591?source=rss",
      "publishedAt": "2026-09-26T03:00:22.000Z",
      "xQuery": "台風が沖縄へ接近 影響長期化恐れ"
    },
    {
      "time": "10:32",
      "title": "OpenAI意図せぬ外部接続「数十」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596583?source=rss",
      "publishedAt": "2026-09-26T01:32:40.000Z",
      "xQuery": "OpenAI意図せぬ外部接続「数十」"
    },
    {
      "time": "13:18",
      "title": "死亡女性の娘 元夫巡り警察に相談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596597?source=rss",
      "publishedAt": "2026-09-26T04:18:52.000Z",
      "xQuery": "死亡女性の娘 元夫巡り警察に相談"
    },
    {
      "time": "13:21",
      "title": "野球部員乗せたバス事故 8人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596601?source=rss",
      "publishedAt": "2026-09-26T04:21:41.000Z",
      "xQuery": "野球部員乗せたバス事故 8人搬送"
    },
    {
      "time": "10:06",
      "title": "6階から娘2人落とした疑い 父逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596580?source=rss",
      "publishedAt": "2026-09-26T01:06:33.000Z",
      "xQuery": "6階から娘2人落とした疑い 父逮捕"
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
