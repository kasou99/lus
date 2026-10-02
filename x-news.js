window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T15:42:58.130Z",
  "items": [
    {
      "time": "00:15",
      "title": "G7 石油備蓄1億バレル協調放出へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597336?source=rss",
      "publishedAt": "2026-10-02T15:15:30.000Z",
      "xQuery": "G7 石油備蓄1億バレル協調放出へ"
    },
    {
      "time": "23:44",
      "title": "第一ライフG 従業員情報漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597333?source=rss",
      "publishedAt": "2026-10-02T14:44:23.000Z",
      "xQuery": "第一ライフG 従業員情報漏えいか"
    },
    {
      "time": "22:54",
      "title": "情報漏えい相次ぐ「異様」と識者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597326?source=rss",
      "publishedAt": "2026-10-02T13:54:01.000Z",
      "xQuery": "情報漏えい相次ぐ「異様」と識者"
    },
    {
      "time": "00:04",
      "title": "焼け跡に4遺体 4歳から13歳の子か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597334?source=rss",
      "publishedAt": "2026-10-02T15:04:50.000Z",
      "xQuery": "焼け跡に4遺体 4歳から13歳の子か"
    },
    {
      "time": "23:38",
      "title": "童謡など作曲 服部公一さんが死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597332?source=rss",
      "publishedAt": "2026-10-02T14:38:09.000Z",
      "xQuery": "童謡など作曲 服部公一さんが死去"
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
