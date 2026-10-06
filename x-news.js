window.LUS_X_NEWS = {
  "updatedAt": "2026-10-06T13:20:23.456Z",
  "items": [
    {
      "time": "17:50",
      "title": "シチズン 約10万人分情報漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597772?source=rss",
      "publishedAt": "2026-10-06T08:50:17.000Z",
      "xQuery": "シチズン 約10万人分情報漏えいか"
    },
    {
      "time": "18:38",
      "title": "韓国「金」で兵役特例 公平性疑問",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597770?source=rss",
      "publishedAt": "2026-10-06T09:38:20.000Z",
      "xQuery": "韓国「金」で兵役特例 公平性疑問"
    },
    {
      "time": "19:51",
      "title": "箱乗りさせ事故 殺人未遂疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597782?source=rss",
      "publishedAt": "2026-10-06T10:51:52.000Z",
      "xQuery": "箱乗りさせ事故 殺人未遂疑い逮捕"
    },
    {
      "time": "20:17",
      "title": "沖縄強殺 被害女性中傷に知事苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597787?source=rss",
      "publishedAt": "2026-10-06T11:17:50.000Z",
      "xQuery": "沖縄強殺 被害女性中傷に知事苦言"
    },
    {
      "time": "16:23",
      "title": "モバイルSuicaのteppay 20日開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597759?source=rss",
      "publishedAt": "2026-10-06T07:23:32.000Z",
      "xQuery": "モバイルSuicaのteppay 20日開始"
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
