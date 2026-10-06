window.LUS_X_NEWS = {
  "updatedAt": "2026-10-06T22:40:49.000Z",
  "items": [
    {
      "time": "07:15",
      "title": "自衛隊に原潜導入 検討案が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597813?source=rss",
      "publishedAt": "2026-10-06T22:15:35.000Z",
      "xQuery": "自衛隊に原潜導入 検討案が浮上"
    },
    {
      "time": "23:43",
      "title": "台風で高波 西湘バイパス通行止め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597805?source=rss",
      "publishedAt": "2026-10-06T14:43:49.000Z",
      "xQuery": "台風で高波 西湘バイパス通行止め"
    },
    {
      "time": "23:14",
      "title": "シルバーカーはまり電車衝突 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597801?source=rss",
      "publishedAt": "2026-10-06T14:14:23.000Z",
      "xQuery": "シルバーカーはまり電車衝突 死亡"
    },
    {
      "time": "06:55",
      "title": "ヘアピンカーブで横転 高校生死傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597812?source=rss",
      "publishedAt": "2026-10-06T21:55:48.000Z",
      "xQuery": "ヘアピンカーブで横転 高校生死傷"
    },
    {
      "time": "23:36",
      "title": "旭化成子会社 55万人分情報流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597804?source=rss",
      "publishedAt": "2026-10-06T14:36:26.000Z",
      "xQuery": "旭化成子会社 55万人分情報流出か"
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
