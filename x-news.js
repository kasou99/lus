window.LUS_X_NEWS = {
  "updatedAt": "2026-10-02T00:51:42.562Z",
  "items": [
    {
      "time": "07:25",
      "title": "政府 ロシアへの追加制裁を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597229?source=rss",
      "publishedAt": "2026-10-01T22:25:05.000Z",
      "xQuery": "政府 ロシアへの追加制裁を検討"
    },
    {
      "time": "09:08",
      "title": "韓国「検察庁」78年の歴史に幕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597240?source=rss",
      "publishedAt": "2026-10-02T00:08:20.000Z",
      "xQuery": "韓国「検察庁」78年の歴史に幕"
    },
    {
      "time": "07:00",
      "title": "米死刑囚への刑執行が「失敗」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597226?source=rss",
      "publishedAt": "2026-10-01T22:00:25.000Z",
      "xQuery": "米死刑囚への刑執行が「失敗」"
    },
    {
      "time": "08:58",
      "title": "3歳死亡 2km超にわたり飲酒運転か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597238?source=rss",
      "publishedAt": "2026-10-01T23:58:14.000Z",
      "xQuery": "3歳死亡 2km超にわたり飲酒運転か"
    },
    {
      "time": "08:38",
      "title": "各地に毒キノコ「妖精の輪」も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597236?source=rss",
      "publishedAt": "2026-10-01T23:38:39.000Z",
      "xQuery": "各地に毒キノコ「妖精の輪」も"
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
