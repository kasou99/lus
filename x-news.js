window.LUS_X_NEWS = {
  "updatedAt": "2026-11-07T02:35:59.933Z",
  "items": [
    {
      "time": "10:39",
      "title": "強い寒気 北海道と東北は暴風警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601620?source=rss",
      "publishedAt": "2026-11-07T01:39:39.000Z",
      "xQuery": "強い寒気 北海道と東北は暴風警戒"
    },
    {
      "time": "09:22",
      "title": "岸田氏 国債NISAは慎重な検討必要",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601610?source=rss",
      "publishedAt": "2026-11-07T00:22:31.000Z",
      "xQuery": "岸田氏 国債NISAは慎重な検討必要"
    },
    {
      "time": "10:39",
      "title": "子宮頸がん死50年に4割増 米大学",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601617?source=rss",
      "publishedAt": "2026-11-07T01:39:39.000Z",
      "xQuery": "子宮頸がん死50年に4割増 米大学"
    },
    {
      "time": "09:59",
      "title": "テスラ サイバートラック生産縮小",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601614?source=rss",
      "publishedAt": "2026-11-07T00:59:00.000Z",
      "xQuery": "テスラ サイバートラック生産縮小"
    },
    {
      "time": "10:58",
      "title": "故障車修理中 車突っ込み1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601623?source=rss",
      "publishedAt": "2026-11-07T01:58:54.000Z",
      "xQuery": "故障車修理中 車突っ込み1人死亡"
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
