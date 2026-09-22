window.LUS_X_NEWS = {
  "updatedAt": "2026-09-22T08:44:57.031Z",
  "items": [
    {
      "time": "17:21",
      "title": "水害後 片付け・復旧作業の注意点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596156?source=rss",
      "publishedAt": "2026-09-22T08:21:34.000Z",
      "xQuery": "水害後 片付け・復旧作業の注意点"
    },
    {
      "time": "16:10",
      "title": "土砂崩れ 高齢者施設の180人孤立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596149?source=rss",
      "publishedAt": "2026-09-22T07:10:19.000Z",
      "xQuery": "土砂崩れ 高齢者施設の180人孤立"
    },
    {
      "time": "17:38",
      "title": "台風で停電 ろうそくで民家全焼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596160?source=rss",
      "publishedAt": "2026-09-22T08:38:55.000Z",
      "xQuery": "台風で停電 ろうそくで民家全焼"
    },
    {
      "time": "16:56",
      "title": "琵琶湖に遺体 3人を捜索の知人か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596151?source=rss",
      "publishedAt": "2026-09-22T07:56:31.000Z",
      "xQuery": "琵琶湖に遺体 3人を捜索の知人か"
    },
    {
      "time": "16:41",
      "title": "自転車にはねられ女性死亡 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596152?source=rss",
      "publishedAt": "2026-09-22T07:41:45.000Z",
      "xQuery": "自転車にはねられ女性死亡 男逮捕"
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
