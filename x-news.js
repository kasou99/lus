window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T08:36:57.014Z",
  "items": [
    {
      "time": "15:38",
      "title": "上昇続く長期金利 一時2.83%に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586936?source=rss",
      "publishedAt": "2026-07-06T06:38:09.000Z",
      "xQuery": "上昇続く長期金利 一時2.83%に"
    },
    {
      "time": "16:08",
      "title": "中国ミサイル発射 日本が懸念伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586939?source=rss",
      "publishedAt": "2026-07-06T07:08:41.000Z",
      "xQuery": "中国ミサイル発射 日本が懸念伝達"
    },
    {
      "time": "16:34",
      "title": "はやぶさ2 小惑星トリフネ撮影",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586942?source=rss",
      "publishedAt": "2026-07-06T07:34:22.000Z",
      "xQuery": "はやぶさ2 小惑星トリフネ撮影"
    },
    {
      "time": "17:18",
      "title": "全東信が破産 負債は約1259億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586950?source=rss",
      "publishedAt": "2026-07-06T08:18:23.000Z",
      "xQuery": "全東信が破産 負債は約1259億円"
    },
    {
      "time": "16:15",
      "title": "鳥人間 作業員が琵琶湖落下し死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586940?source=rss",
      "publishedAt": "2026-07-06T07:15:58.000Z",
      "xQuery": "鳥人間 作業員が琵琶湖落下し死亡"
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
