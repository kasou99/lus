window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T20:12:39.232Z",
  "items": [
    {
      "time": "00:15",
      "title": "西-東日本で大雨 河川増水に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586403?source=rss",
      "publishedAt": "2026-07-01T15:15:41.000Z",
      "xQuery": "西-東日本で大雨 河川増水に警戒"
    },
    {
      "time": "23:40",
      "title": "麻生太郎氏 高市政権の実績を評価",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586401?source=rss",
      "publishedAt": "2026-07-01T14:40:00.000Z",
      "xQuery": "麻生太郎氏 高市政権の実績を評価"
    },
    {
      "time": "22:35",
      "title": "スペイン 熱波で1000人以上死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586395?source=rss",
      "publishedAt": "2026-07-01T13:35:47.000Z",
      "xQuery": "スペイン 熱波で1000人以上死亡"
    },
    {
      "time": "21:36",
      "title": "行方不明の10歳死亡 校長が陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586389?source=rss",
      "publishedAt": "2026-07-01T12:36:22.000Z",
      "xQuery": "行方不明の10歳死亡 校長が陳謝"
    },
    {
      "time": "17:24",
      "title": "山に遺体 クマが人を獲物と認識か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586361?source=rss",
      "publishedAt": "2026-07-01T08:24:37.000Z",
      "xQuery": "山に遺体 クマが人を獲物と認識か"
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
