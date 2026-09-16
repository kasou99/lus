window.LUS_X_NEWS = {
  "updatedAt": "2026-09-16T11:16:42.030Z",
  "items": [
    {
      "time": "17:39",
      "title": "男女平等 日本は145カ国中の117位",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595505?source=rss",
      "publishedAt": "2026-09-16T08:39:30.000Z",
      "xQuery": "男女平等 日本は145カ国中の117位"
    },
    {
      "time": "18:33",
      "title": "辺野古転覆 運航団体が謝罪声明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595510?source=rss",
      "publishedAt": "2026-09-16T09:33:17.000Z",
      "xQuery": "辺野古転覆 運航団体が謝罪声明"
    },
    {
      "time": "18:25",
      "title": "10年前に性的暴行疑い 容疑者逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595509?source=rss",
      "publishedAt": "2026-09-16T09:25:26.000Z",
      "xQuery": "10年前に性的暴行疑い 容疑者逮捕"
    },
    {
      "time": "17:03",
      "title": "赤い羽根募金 さらに7000万円不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595501?source=rss",
      "publishedAt": "2026-09-16T08:03:44.000Z",
      "xQuery": "赤い羽根募金 さらに7000万円不明"
    },
    {
      "time": "19:32",
      "title": "NHK 飲酒ガイドライン策定検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595512?source=rss",
      "publishedAt": "2026-09-16T10:32:22.000Z",
      "xQuery": "NHK 飲酒ガイドライン策定検討"
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
