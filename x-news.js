window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T14:22:59.223Z",
  "items": [
    {
      "time": "22:33",
      "title": "社保改革協議 自維合意へ最終調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586394?source=rss",
      "publishedAt": "2026-07-01T13:33:40.000Z",
      "xQuery": "社保改革協議 自維合意へ最終調整"
    },
    {
      "time": "22:39",
      "title": "衆院女性トイレ増設へ 有志が要望",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586398?source=rss",
      "publishedAt": "2026-07-01T13:39:10.000Z",
      "xQuery": "衆院女性トイレ増設へ 有志が要望"
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
      "time": "22:42",
      "title": "母娘死亡 父は逮捕前に毒物服用か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586397?source=rss",
      "publishedAt": "2026-07-01T13:42:29.000Z",
      "xQuery": "母娘死亡 父は逮捕前に毒物服用か"
    },
    {
      "time": "21:36",
      "title": "行方不明の10歳死亡 校長が陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586389?source=rss",
      "publishedAt": "2026-07-01T12:36:22.000Z",
      "xQuery": "行方不明の10歳死亡 校長が陳謝"
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
