window.LUS_X_NEWS = {
  "updatedAt": "2026-11-09T09:34:49.960Z",
  "items": [
    {
      "time": "17:44",
      "title": "石破前首相ら4人を戒告処分 自民",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601933?source=rss",
      "publishedAt": "2026-11-09T08:44:45.000Z",
      "xQuery": "石破前首相ら4人を戒告処分 自民"
    },
    {
      "time": "17:58",
      "title": "ニトリ 最大3762万件の情報流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601934?source=rss",
      "publishedAt": "2026-11-09T08:58:01.000Z",
      "xQuery": "ニトリ 最大3762万件の情報流出か"
    },
    {
      "time": "17:14",
      "title": "労基法 女子保護規定の全廃検討へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601927?source=rss",
      "publishedAt": "2026-11-09T08:14:20.000Z",
      "xQuery": "労基法 女子保護規定の全廃検討へ"
    },
    {
      "time": "16:27",
      "title": "死亡男児の腸に穴 傷害疑い男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601920?source=rss",
      "publishedAt": "2026-11-09T07:27:19.000Z",
      "xQuery": "死亡男児の腸に穴 傷害疑い男逮捕"
    },
    {
      "time": "17:13",
      "title": "津波巡り欧州のビール物議 謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601926?source=rss",
      "publishedAt": "2026-11-09T08:13:57.000Z",
      "xQuery": "津波巡り欧州のビール物議 謝罪"
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
