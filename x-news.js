window.LUS_X_NEWS = {
  "updatedAt": "2026-07-31T23:25:07.771Z",
  "items": [
    {
      "time": "07:34",
      "title": "熊本9000人超避難 住宅被害1526棟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590094?source=rss",
      "publishedAt": "2026-07-31T22:34:04.000Z",
      "xQuery": "熊本9000人超避難 住宅被害1526棟"
    },
    {
      "time": "07:34",
      "title": "九州-関東危険な暑さ 熱中症警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590093?source=rss",
      "publishedAt": "2026-07-31T22:34:16.000Z",
      "xQuery": "九州-関東危険な暑さ 熱中症警戒"
    },
    {
      "time": "07:11",
      "title": "円 一時1ドル157円台半ばまで急騰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590088?source=rss",
      "publishedAt": "2026-07-31T22:11:29.000Z",
      "xQuery": "円 一時1ドル157円台半ばまで急騰"
    },
    {
      "time": "07:32",
      "title": "スペイン飛び地不法移民 大半帰還",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590092?source=rss",
      "publishedAt": "2026-07-31T22:32:55.000Z",
      "xQuery": "スペイン飛び地不法移民 大半帰還"
    },
    {
      "time": "07:13",
      "title": "三笘薫選手の人身事故 不起訴処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590089?source=rss",
      "publishedAt": "2026-07-31T22:13:36.000Z",
      "xQuery": "三笘薫選手の人身事故 不起訴処分"
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
