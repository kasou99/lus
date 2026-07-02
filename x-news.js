window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T08:07:30.825Z",
  "items": [
    {
      "time": "16:40",
      "title": "台風9号発生 来週末に沖縄影響か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586477?source=rss",
      "publishedAt": "2026-07-02T07:40:17.000Z",
      "xQuery": "台風9号発生 来週末に沖縄影響か"
    },
    {
      "time": "16:12",
      "title": "養子案制度設計巡り論戦へ 焦点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586474?source=rss",
      "publishedAt": "2026-07-02T07:12:01.000Z",
      "xQuery": "養子案制度設計巡り論戦へ 焦点は"
    },
    {
      "time": "16:30",
      "title": "梅雨明け予想 関東甲信は7/20頃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586475?source=rss",
      "publishedAt": "2026-07-02T07:30:03.000Z",
      "xQuery": "梅雨明け予想 関東甲信は7/20頃"
    },
    {
      "time": "15:29",
      "title": "大手夏のボーナス 初の100万円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586469?source=rss",
      "publishedAt": "2026-07-02T06:29:07.000Z",
      "xQuery": "大手夏のボーナス 初の100万円超"
    },
    {
      "time": "15:39",
      "title": "アイヌ側の控訴棄却 先住権訴訟で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586470?source=rss",
      "publishedAt": "2026-07-02T06:39:24.000Z",
      "xQuery": "アイヌ側の控訴棄却 先住権訴訟で"
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
