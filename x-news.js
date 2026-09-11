window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T10:18:02.827Z",
  "items": [
    {
      "time": "16:25",
      "title": "日銀利上げの公算大 1.25%程度に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594960?source=rss",
      "publishedAt": "2026-09-11T07:25:40.000Z",
      "xQuery": "日銀利上げの公算大 1.25%程度に"
    },
    {
      "time": "16:49",
      "title": "兵器開発にClaude利用の恐れ阻止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594964?source=rss",
      "publishedAt": "2026-09-11T07:49:17.000Z",
      "xQuery": "兵器開発にClaude利用の恐れ阻止"
    },
    {
      "time": "17:54",
      "title": "地獄だった 北へ渡った在日韓国人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594971?source=rss",
      "publishedAt": "2026-09-11T08:54:41.000Z",
      "xQuery": "地獄だった 北へ渡った在日韓国人"
    },
    {
      "time": "16:58",
      "title": "高2死亡 少年4人と盗難トラブルか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594965?source=rss",
      "publishedAt": "2026-09-11T07:58:56.000Z",
      "xQuery": "高2死亡 少年4人と盗難トラブルか"
    },
    {
      "time": "18:31",
      "title": "9月の都心 日照時間が史上最少",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594976?source=rss",
      "publishedAt": "2026-09-11T09:31:24.000Z",
      "xQuery": "9月の都心 日照時間が史上最少"
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
