window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T01:38:04.172Z",
  "items": [
    {
      "time": "10:16",
      "title": "北朝鮮が日本海に向け飛翔体発射",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601267?source=rss",
      "publishedAt": "2026-11-04T01:16:27.000Z",
      "xQuery": "北朝鮮が日本海に向け飛翔体発射"
    },
    {
      "time": "10:01",
      "title": "中継 米中間選挙の開票速報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601265?source=rss",
      "publishedAt": "2026-11-04T01:01:21.000Z",
      "xQuery": "中継 米中間選挙の開票速報"
    },
    {
      "time": "09:20",
      "title": "自治体システム移行費巡り調査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601258?source=rss",
      "publishedAt": "2026-11-04T00:20:10.000Z",
      "xQuery": "自治体システム移行費巡り調査へ"
    },
    {
      "time": "08:23",
      "title": "関東一部 5日朝に警報級大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601253?source=rss",
      "publishedAt": "2026-11-03T23:23:21.000Z",
      "xQuery": "関東一部 5日朝に警報級大雨恐れ"
    },
    {
      "time": "09:49",
      "title": "1兆円盗難 バイナンスが手口公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601264?source=rss",
      "publishedAt": "2026-11-04T00:49:15.000Z",
      "xQuery": "1兆円盗難 バイナンスが手口公表"
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
