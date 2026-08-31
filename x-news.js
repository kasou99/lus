window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T23:15:01.288Z",
  "items": [
    {
      "time": "07:30",
      "title": "中道分裂へ 急ごしらえで限界露呈",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593799?source=rss",
      "publishedAt": "2026-08-31T22:30:01.000Z",
      "xQuery": "中道分裂へ 急ごしらえで限界露呈"
    },
    {
      "time": "06:52",
      "title": "米露財務相が会談 ウ和平案協議か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593798?source=rss",
      "publishedAt": "2026-08-31T21:52:17.000Z",
      "xQuery": "米露財務相が会談 ウ和平案協議か"
    },
    {
      "time": "08:00",
      "title": "米財務長官 日銀の利上げを示唆か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593803?source=rss",
      "publishedAt": "2026-08-31T23:00:59.000Z",
      "xQuery": "米財務長官 日銀の利上げを示唆か"
    },
    {
      "time": "23:46",
      "title": "和菓子店の店主死亡 トクリュウか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593793?source=rss",
      "publishedAt": "2026-08-31T14:46:29.000Z",
      "xQuery": "和菓子店の店主死亡 トクリュウか"
    },
    {
      "time": "07:31",
      "title": "車2台が正面衝突し1人死亡 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593801?source=rss",
      "publishedAt": "2026-08-31T22:31:09.000Z",
      "xQuery": "車2台が正面衝突し1人死亡 男逮捕"
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
