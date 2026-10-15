window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T02:24:09.618Z",
  "items": [
    {
      "time": "10:26",
      "title": "農相 後任に自民・武部新氏の方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598828?source=rss",
      "publishedAt": "2026-10-15T01:26:23.000Z",
      "xQuery": "農相 後任に自民・武部新氏の方針"
    },
    {
      "time": "10:57",
      "title": "日経平均 一時3000円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598832?source=rss",
      "publishedAt": "2026-10-15T01:57:34.000Z",
      "xQuery": "日経平均 一時3000円以上値下がり"
    },
    {
      "time": "08:38",
      "title": "仏で高校生がデモ 激化する背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598812?source=rss",
      "publishedAt": "2026-10-14T23:38:28.000Z",
      "xQuery": "仏で高校生がデモ 激化する背景"
    },
    {
      "time": "10:37",
      "title": "金塊1.4億円相当 82歳が詐欺被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598829?source=rss",
      "publishedAt": "2026-10-15T01:37:55.000Z",
      "xQuery": "金塊1.4億円相当 82歳が詐欺被害"
    },
    {
      "time": "10:46",
      "title": "豆腐の移動販売で年商20億円 秘訣",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598825?source=rss",
      "publishedAt": "2026-10-15T01:46:35.000Z",
      "xQuery": "豆腐の移動販売で年商20億円 秘訣"
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
