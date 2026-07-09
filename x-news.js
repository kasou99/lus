window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T13:33:07.391Z",
  "items": [
    {
      "time": "20:39",
      "title": "元宮内庁長官 典範は構造的欠陥",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587339?source=rss",
      "publishedAt": "2026-07-09T11:39:38.000Z",
      "xQuery": "元宮内庁長官 典範は構造的欠陥"
    },
    {
      "time": "22:04",
      "title": "中道落選者が意見交換 代表涙ぐむ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587344?source=rss",
      "publishedAt": "2026-07-09T13:04:45.000Z",
      "xQuery": "中道落選者が意見交換 代表涙ぐむ"
    },
    {
      "time": "20:38",
      "title": "山本太郎氏 政界引退を表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587340?source=rss",
      "publishedAt": "2026-07-09T11:38:41.000Z",
      "xQuery": "山本太郎氏 政界引退を表明"
    },
    {
      "time": "20:36",
      "title": "富山空港の新愛称 訪日客も賛否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587338?source=rss",
      "publishedAt": "2026-07-09T11:36:29.000Z",
      "xQuery": "富山空港の新愛称 訪日客も賛否"
    },
    {
      "time": "22:06",
      "title": "ジャンプ付録巡る混乱 書店が警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587346?source=rss",
      "publishedAt": "2026-07-09T13:06:01.000Z",
      "xQuery": "ジャンプ付録巡る混乱 書店が警戒"
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
