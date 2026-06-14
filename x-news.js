window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T03:50:08.145Z",
  "items": [
    {
      "time": "12:40",
      "title": "皇室典範改正の議論 今後の焦点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584186?source=rss",
      "publishedAt": "2026-06-14T03:40:14.000Z",
      "xQuery": "皇室典範改正の議論 今後の焦点は"
    },
    {
      "time": "10:35",
      "title": "警視庁 警察学校見学ツアー始める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584170?source=rss",
      "publishedAt": "2026-06-14T01:35:59.000Z",
      "xQuery": "警視庁 警察学校見学ツアー始める"
    },
    {
      "time": "11:13",
      "title": "学校放送室に基準値超のダニ 福岡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584179?source=rss",
      "publishedAt": "2026-06-14T02:13:11.000Z",
      "xQuery": "学校放送室に基準値超のダニ 福岡"
    },
    {
      "time": "09:54",
      "title": "戒名作成にAI活用で議論 住職見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584165?source=rss",
      "publishedAt": "2026-06-14T00:54:00.000Z",
      "xQuery": "戒名作成にAI活用で議論 住職見解"
    },
    {
      "time": "12:17",
      "title": "ボビー・オロゴン容疑者を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584185?source=rss",
      "publishedAt": "2026-06-14T03:17:18.000Z",
      "xQuery": "ボビー・オロゴン容疑者を逮捕"
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
