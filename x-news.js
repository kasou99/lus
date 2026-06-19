window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T01:40:11.377Z",
  "items": [
    {
      "time": "09:39",
      "title": "30℃以上が続出 熱中症に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584797?source=rss",
      "publishedAt": "2026-06-19T00:39:59.000Z",
      "xQuery": "30℃以上が続出 熱中症に注意"
    },
    {
      "time": "08:35",
      "title": "G7閉幕 首相「アジア代表」強調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584786?source=rss",
      "publishedAt": "2026-06-18T23:35:30.000Z",
      "xQuery": "G7閉幕 首相「アジア代表」強調"
    },
    {
      "time": "10:08",
      "title": "利上げ周回遅れ 円安是正効果なく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584800?source=rss",
      "publishedAt": "2026-06-19T01:08:12.000Z",
      "xQuery": "利上げ周回遅れ 円安是正効果なく"
    },
    {
      "time": "10:03",
      "title": "乗用車運搬の貨物船 海岸で座礁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584801?source=rss",
      "publishedAt": "2026-06-19T01:03:34.000Z",
      "xQuery": "乗用車運搬の貨物船 海岸で座礁"
    },
    {
      "time": "08:52",
      "title": "「マック一強」終わり? 市場異変",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584790?source=rss",
      "publishedAt": "2026-06-18T23:52:19.000Z",
      "xQuery": "「マック一強」終わり? 市場異変"
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
