window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T14:20:08.587Z",
  "items": [
    {
      "time": "22:49",
      "title": "辺野古訴訟 一部に原告適格認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587827?source=rss",
      "publishedAt": "2026-07-13T13:49:54.000Z",
      "xQuery": "辺野古訴訟 一部に原告適格認める"
    },
    {
      "time": "21:14",
      "title": "14日 東日本も熱中症リスク高まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587822?source=rss",
      "publishedAt": "2026-07-13T12:14:59.000Z",
      "xQuery": "14日 東日本も熱中症リスク高まる"
    },
    {
      "time": "20:55",
      "title": "4人刺傷 誰でも良かったと男供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587820?source=rss",
      "publishedAt": "2026-07-13T11:55:48.000Z",
      "xQuery": "4人刺傷 誰でも良かったと男供述"
    },
    {
      "time": "20:19",
      "title": "検事の不適切関係 女性がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587814?source=rss",
      "publishedAt": "2026-07-13T11:19:45.000Z",
      "xQuery": "検事の不適切関係 女性がコメント"
    },
    {
      "time": "21:48",
      "title": "高尾署で勾留中 トルコ人男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587823?source=rss",
      "publishedAt": "2026-07-13T12:48:00.000Z",
      "xQuery": "高尾署で勾留中 トルコ人男性死亡"
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
