window.LUS_X_NEWS = {
  "updatedAt": "2026-08-18T12:48:26.533Z",
  "items": [
    {
      "time": "18:00",
      "title": "大型クロマグロ 漁獲枠25%拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592194?source=rss",
      "publishedAt": "2026-08-18T09:00:55.000Z",
      "xQuery": "大型クロマグロ 漁獲枠25%拡大"
    },
    {
      "time": "20:22",
      "title": "陸自の個人情報収集 昨年公益通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592210?source=rss",
      "publishedAt": "2026-08-18T11:22:46.000Z",
      "xQuery": "陸自の個人情報収集 昨年公益通報"
    },
    {
      "time": "20:38",
      "title": "LINEクレジット 都が業務改善命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592197?source=rss",
      "publishedAt": "2026-08-18T11:38:58.000Z",
      "xQuery": "LINEクレジット 都が業務改善命令"
    },
    {
      "time": "21:33",
      "title": "放火し両親殺害未遂疑い 15歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592211?source=rss",
      "publishedAt": "2026-08-18T12:33:09.000Z",
      "xQuery": "放火し両親殺害未遂疑い 15歳逮捕"
    },
    {
      "time": "21:20",
      "title": "通販生活が楽天市場から撤退",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592215?source=rss",
      "publishedAt": "2026-08-18T12:20:22.000Z",
      "xQuery": "通販生活が楽天市場から撤退"
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
