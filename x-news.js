window.LUS_X_NEWS = {
  "updatedAt": "2026-08-17T02:31:48.839Z",
  "items": [
    {
      "time": "11:16",
      "title": "長期金利が上昇 約30年ぶり高水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592041?source=rss",
      "publishedAt": "2026-08-17T02:16:48.000Z",
      "xQuery": "長期金利が上昇 約30年ぶり高水準"
    },
    {
      "time": "09:15",
      "title": "各地で厳しい残暑 熱中症に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592027?source=rss",
      "publishedAt": "2026-08-17T00:15:02.000Z",
      "xQuery": "各地で厳しい残暑 熱中症に注意"
    },
    {
      "time": "08:29",
      "title": "豪雨で放置車両 撤去見通し立たず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592023?source=rss",
      "publishedAt": "2026-08-16T23:29:07.000Z",
      "xQuery": "豪雨で放置車両 撤去見通し立たず"
    },
    {
      "time": "08:59",
      "title": "マンホールの蓋複数飛ぶ 民家破損",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592025?source=rss",
      "publishedAt": "2026-08-16T23:59:39.000Z",
      "xQuery": "マンホールの蓋複数飛ぶ 民家破損"
    },
    {
      "time": "10:13",
      "title": "岩国のシロヘビ 1年間で281匹死ぬ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592033?source=rss",
      "publishedAt": "2026-08-17T01:13:38.000Z",
      "xQuery": "岩国のシロヘビ 1年間で281匹死ぬ"
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
