window.LUS_X_NEWS = {
  "updatedAt": "2026-07-24T10:18:41.552Z",
  "items": [
    {
      "time": "16:52",
      "title": "世銀 中国への融資を段階的に廃止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589149?source=rss",
      "publishedAt": "2026-07-24T07:52:42.000Z",
      "xQuery": "世銀 中国への融資を段階的に廃止"
    },
    {
      "time": "18:37",
      "title": "いよぎんHDと愛媛銀 来年4月統合",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589170?source=rss",
      "publishedAt": "2026-07-24T09:37:37.000Z",
      "xQuery": "いよぎんHDと愛媛銀 来年4月統合"
    },
    {
      "time": "17:55",
      "title": "南鳥島レアアース泥 分析結果公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589165?source=rss",
      "publishedAt": "2026-07-24T08:55:47.000Z",
      "xQuery": "南鳥島レアアース泥 分析結果公表"
    },
    {
      "time": "19:06",
      "title": "湖で男性死亡 近くにSUPボード",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589172?source=rss",
      "publishedAt": "2026-07-24T10:06:17.000Z",
      "xQuery": "湖で男性死亡 近くにSUPボード"
    },
    {
      "time": "18:00",
      "title": "「私かも」児童ひき逃げ巡り出頭",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589166?source=rss",
      "publishedAt": "2026-07-24T09:00:29.000Z",
      "xQuery": "「私かも」児童ひき逃げ巡り出頭"
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
