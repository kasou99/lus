window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T10:10:19.415Z",
  "items": [
    {
      "time": "18:41",
      "title": "ICC赤根所長に制裁 首相「残念」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592318?source=rss",
      "publishedAt": "2026-08-19T09:41:30.000Z",
      "xQuery": "ICC赤根所長に制裁 首相「残念」"
    },
    {
      "time": "15:35",
      "title": "トロ安くなる? マグロ漁獲枠拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592288?source=rss",
      "publishedAt": "2026-08-19T06:35:20.000Z",
      "xQuery": "トロ安くなる? マグロ漁獲枠拡大"
    },
    {
      "time": "18:01",
      "title": "米警察 少女行方不明で霊能者頼る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592308?source=rss",
      "publishedAt": "2026-08-19T09:01:52.000Z",
      "xQuery": "米警察 少女行方不明で霊能者頼る"
    },
    {
      "time": "16:19",
      "title": "女児34人にわいせつ 元教諭に実刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592294?source=rss",
      "publishedAt": "2026-08-19T07:19:14.000Z",
      "xQuery": "女児34人にわいせつ 元教諭に実刑"
    },
    {
      "time": "17:20",
      "title": "ロケット残骸衝突 月にクレーター",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592303?source=rss",
      "publishedAt": "2026-08-19T08:20:31.000Z",
      "xQuery": "ロケット残骸衝突 月にクレーター"
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
