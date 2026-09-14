window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T05:40:33.030Z",
  "items": [
    {
      "time": "14:27",
      "title": "浜岡原発 再稼働の申請取り下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595258?source=rss",
      "publishedAt": "2026-09-14T05:27:50.000Z",
      "xQuery": "浜岡原発 再稼働の申請取り下げ"
    },
    {
      "time": "13:58",
      "title": "中継 データ不正巡り中部電が会見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595253?source=rss",
      "publishedAt": "2026-09-14T04:58:23.000Z",
      "xQuery": "中継 データ不正巡り中部電が会見"
    },
    {
      "time": "13:44",
      "title": "沖縄知事選 得票差に古謝氏驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595254?source=rss",
      "publishedAt": "2026-09-14T04:44:37.000Z",
      "xQuery": "沖縄知事選 得票差に古謝氏驚き"
    },
    {
      "time": "12:36",
      "title": "ダウン症の子6年の生涯 CMに反響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595245?source=rss",
      "publishedAt": "2026-09-14T03:36:35.000Z",
      "xQuery": "ダウン症の子6年の生涯 CMに反響"
    },
    {
      "time": "13:53",
      "title": "ロマンスカーとコンバインが衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595256?source=rss",
      "publishedAt": "2026-09-14T04:53:49.000Z",
      "xQuery": "ロマンスカーとコンバインが衝突"
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
