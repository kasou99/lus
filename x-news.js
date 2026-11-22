window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T04:13:10.186Z",
  "items": [
    {
      "time": "12:02",
      "title": "自民 原潜保有議論「排除せず」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603529?source=rss",
      "publishedAt": "2026-11-22T03:02:53.000Z",
      "xQuery": "自民 原潜保有議論「排除せず」"
    },
    {
      "time": "12:42",
      "title": "記録的降水量の北陸 土砂災害警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603534?source=rss",
      "publishedAt": "2026-11-22T03:42:27.000Z",
      "xQuery": "記録的降水量の北陸 土砂災害警戒"
    },
    {
      "time": "11:31",
      "title": "AI兵器先行の米露 規制に消極姿勢",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603522?source=rss",
      "publishedAt": "2026-11-22T02:31:54.000Z",
      "xQuery": "AI兵器先行の米露 規制に消極姿勢"
    },
    {
      "time": "12:19",
      "title": "既婚者専用マッチングアプリ 実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603531?source=rss",
      "publishedAt": "2026-11-22T03:19:01.000Z",
      "xQuery": "既婚者専用マッチングアプリ 実態"
    },
    {
      "time": "10:05",
      "title": "若者の手芸ブーム AI時代になぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603515?source=rss",
      "publishedAt": "2026-11-22T01:05:26.000Z",
      "xQuery": "若者の手芸ブーム AI時代になぜ"
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
