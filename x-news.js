window.LUS_X_NEWS = {
  "updatedAt": "2026-07-07T06:49:36.560Z",
  "items": [
    {
      "time": "14:34",
      "title": "ナフサの備蓄検討を表明 経産相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587042?source=rss",
      "publishedAt": "2026-07-07T05:34:43.000Z",
      "xQuery": "ナフサの備蓄検討を表明 経産相"
    },
    {
      "time": "11:44",
      "title": "高齢者医療負担 原則3割明記せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587026?source=rss",
      "publishedAt": "2026-07-07T02:44:23.000Z",
      "xQuery": "高齢者医療負担 原則3割明記せず"
    },
    {
      "time": "15:11",
      "title": "メガソーラー巡る画期的判決 焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587043?source=rss",
      "publishedAt": "2026-07-07T06:11:23.000Z",
      "xQuery": "メガソーラー巡る画期的判決 焦点"
    },
    {
      "time": "14:16",
      "title": "空気注入 殺人罪2件のうち1件無罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587040?source=rss",
      "publishedAt": "2026-07-07T05:16:11.000Z",
      "xQuery": "空気注入 殺人罪2件のうち1件無罪"
    },
    {
      "time": "13:17",
      "title": "18年前に男性を殺害疑い 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587037?source=rss",
      "publishedAt": "2026-07-07T04:17:33.000Z",
      "xQuery": "18年前に男性を殺害疑い 男を逮捕"
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
