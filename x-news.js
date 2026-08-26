window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T05:14:13.507Z",
  "items": [
    {
      "time": "12:35",
      "title": "沖縄・奄美 台風の影響長引く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593125?source=rss",
      "publishedAt": "2026-08-26T03:35:45.000Z",
      "xQuery": "沖縄・奄美 台風の影響長引く"
    },
    {
      "time": "10:02",
      "title": "田久保氏巡る刑事裁判 焦点を解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593100?source=rss",
      "publishedAt": "2026-08-26T01:02:03.000Z",
      "xQuery": "田久保氏巡る刑事裁判 焦点を解説"
    },
    {
      "time": "13:36",
      "title": "同志社理事長ら辞任 遺族コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593129?source=rss",
      "publishedAt": "2026-08-26T04:36:55.000Z",
      "xQuery": "同志社理事長ら辞任 遺族コメント"
    },
    {
      "time": "11:56",
      "title": "子助けようとしたか 父流され死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593114?source=rss",
      "publishedAt": "2026-08-26T02:56:44.000Z",
      "xQuery": "子助けようとしたか 父流され死亡"
    },
    {
      "time": "13:45",
      "title": "世界12都市エアコン使用 東京最長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593131?source=rss",
      "publishedAt": "2026-08-26T04:45:08.000Z",
      "xQuery": "世界12都市エアコン使用 東京最長"
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
