window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T02:25:58.042Z",
  "items": [
    {
      "time": "10:47",
      "title": "補正予算案審議巡り 与野党攻防へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582387?source=rss",
      "publishedAt": "2026-05-31T01:47:50.000Z",
      "xQuery": "補正予算案審議巡り 与野党攻防へ"
    },
    {
      "time": "08:58",
      "title": "建国公演辞退相次ぐ 米大統領怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582373?source=rss",
      "publishedAt": "2026-05-30T23:58:38.000Z",
      "xQuery": "建国公演辞退相次ぐ 米大統領怒り"
    },
    {
      "time": "10:25",
      "title": "中道大敗 かつての民主王国は今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582383?source=rss",
      "publishedAt": "2026-05-31T01:25:05.000Z",
      "xQuery": "中道大敗 かつての民主王国は今"
    },
    {
      "time": "09:58",
      "title": "無許可でモスク建設 市が是正指導",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582380?source=rss",
      "publishedAt": "2026-05-31T00:58:34.000Z",
      "xQuery": "無許可でモスク建設 市が是正指導"
    },
    {
      "time": "10:16",
      "title": "NISA利用 地域や年収でばらつき",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582382?source=rss",
      "publishedAt": "2026-05-31T01:16:06.000Z",
      "xQuery": "NISA利用 地域や年収でばらつき"
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
