window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T09:40:29.756Z",
  "items": [
    {
      "time": "17:32",
      "title": "あいち・三十三FG 統合合意解消",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594874?source=rss",
      "publishedAt": "2026-09-10T08:32:58.000Z",
      "xQuery": "あいち・三十三FG 統合合意解消"
    },
    {
      "time": "17:06",
      "title": "福岡の大学病院分院 閉院続く事情",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594869?source=rss",
      "publishedAt": "2026-09-10T08:06:38.000Z",
      "xQuery": "福岡の大学病院分院 閉院続く事情"
    },
    {
      "time": "16:34",
      "title": "迷惑行為横行で中学生出禁 店の今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594864?source=rss",
      "publishedAt": "2026-09-10T07:34:11.000Z",
      "xQuery": "迷惑行為横行で中学生出禁 店の今"
    },
    {
      "time": "17:43",
      "title": "鳥貴族 均一価格410円に値上げへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594875?source=rss",
      "publishedAt": "2026-09-10T08:43:17.000Z",
      "xQuery": "鳥貴族 均一価格410円に値上げへ"
    },
    {
      "time": "18:17",
      "title": "野生ラッコ巡り町議が違反 辞職へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594885?source=rss",
      "publishedAt": "2026-09-10T09:17:44.000Z",
      "xQuery": "野生ラッコ巡り町議が違反 辞職へ"
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
