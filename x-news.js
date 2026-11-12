window.LUS_X_NEWS = {
  "updatedAt": "2026-11-12T23:35:37.491Z",
  "items": [
    {
      "time": "06:59",
      "title": "エヌビディアCEO辞任 動揺広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602361?source=rss",
      "publishedAt": "2026-11-12T21:59:48.000Z",
      "xQuery": "エヌビディアCEO辞任 動揺広がる"
    },
    {
      "time": "07:42",
      "title": "山形県で住宅全焼 3人の遺体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602365?source=rss",
      "publishedAt": "2026-11-12T22:42:21.000Z",
      "xQuery": "山形県で住宅全焼 3人の遺体"
    },
    {
      "time": "07:44",
      "title": "米首都銃撃5人死傷 容疑者も死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602368?source=rss",
      "publishedAt": "2026-11-12T22:44:16.000Z",
      "xQuery": "米首都銃撃5人死傷 容疑者も死亡"
    },
    {
      "time": "07:19",
      "title": "「Microsoft 365」で大規模障害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602362?source=rss",
      "publishedAt": "2026-11-12T22:19:09.000Z",
      "xQuery": "「Microsoft 365」で大規模障害"
    },
    {
      "time": "22:05",
      "title": "勤務先から21億円超横領疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602347?source=rss",
      "publishedAt": "2026-11-12T13:05:20.000Z",
      "xQuery": "勤務先から21億円超横領疑い 逮捕"
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
