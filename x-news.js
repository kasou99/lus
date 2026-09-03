window.LUS_X_NEWS = {
  "updatedAt": "2026-09-03T10:18:52.049Z",
  "items": [
    {
      "time": "18:15",
      "title": "2次補正案 今秋見送りで政府調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594119?source=rss",
      "publishedAt": "2026-09-03T09:15:28.000Z",
      "xQuery": "2次補正案 今秋見送りで政府調整"
    },
    {
      "time": "18:27",
      "title": "最低賃金改定額 33府県で目安超え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594116?source=rss",
      "publishedAt": "2026-09-03T09:27:27.000Z",
      "xQuery": "最低賃金改定額 33府県で目安超え"
    },
    {
      "time": "17:10",
      "title": "19歳次女を刺殺疑い 70歳の父逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594111?source=rss",
      "publishedAt": "2026-09-03T08:10:03.000Z",
      "xQuery": "19歳次女を刺殺疑い 70歳の父逮捕"
    },
    {
      "time": "17:07",
      "title": "メタノールで夫に障害 妻無罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594107?source=rss",
      "publishedAt": "2026-09-03T08:07:23.000Z",
      "xQuery": "メタノールで夫に障害 妻無罪判決"
    },
    {
      "time": "18:33",
      "title": "日本製紙八代 解体中に出火と通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594122?source=rss",
      "publishedAt": "2026-09-03T09:33:12.000Z",
      "xQuery": "日本製紙八代 解体中に出火と通報"
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
