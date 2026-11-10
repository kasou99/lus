window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T04:13:19.021Z",
  "items": [
    {
      "time": "12:49",
      "title": "内水氾濫の被害軽減へ 国が対応策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602029?source=rss",
      "publishedAt": "2026-11-10T03:49:52.000Z",
      "xQuery": "内水氾濫の被害軽減へ 国が対応策"
    },
    {
      "time": "09:50",
      "title": "ホンダ 米オハイオ州に工場新設へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601998?source=rss",
      "publishedAt": "2026-11-10T00:50:15.000Z",
      "xQuery": "ホンダ 米オハイオ州に工場新設へ"
    },
    {
      "time": "12:17",
      "title": "徳島・阿波市長ら 詐欺疑いで逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602024?source=rss",
      "publishedAt": "2026-11-10T03:17:55.000Z",
      "xQuery": "徳島・阿波市長ら 詐欺疑いで逮捕"
    },
    {
      "time": "11:43",
      "title": "マンション2人死亡 7階から転落か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602017?source=rss",
      "publishedAt": "2026-11-10T02:43:06.000Z",
      "xQuery": "マンション2人死亡 7階から転落か"
    },
    {
      "time": "12:32",
      "title": "元交際相手に「いいね」14回 有罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602027?source=rss",
      "publishedAt": "2026-11-10T03:32:12.000Z",
      "xQuery": "元交際相手に「いいね」14回 有罪"
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
