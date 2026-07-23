window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T22:25:58.637Z",
  "items": [
    {
      "time": "07:21",
      "title": "米政権が新関税発表 日本は12.5%",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589090?source=rss",
      "publishedAt": "2026-07-23T22:21:40.000Z",
      "xQuery": "米政権が新関税発表 日本は12.5%"
    },
    {
      "time": "06:09",
      "title": "元日本赤軍 岡本公三容疑者が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589085?source=rss",
      "publishedAt": "2026-07-23T21:09:15.000Z",
      "xQuery": "元日本赤軍 岡本公三容疑者が死亡"
    },
    {
      "time": "06:45",
      "title": "8月初旬 関東甲信など40℃以上か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589088?source=rss",
      "publishedAt": "2026-07-23T21:45:38.000Z",
      "xQuery": "8月初旬 関東甲信など40℃以上か"
    },
    {
      "time": "23:12",
      "title": "セブン従業員が不正転売 法的には",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589081?source=rss",
      "publishedAt": "2026-07-23T14:12:27.000Z",
      "xQuery": "セブン従業員が不正転売 法的には"
    },
    {
      "time": "21:38",
      "title": "山岳部の女子高校生 奥穂高で滑落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589072?source=rss",
      "publishedAt": "2026-07-23T12:38:37.000Z",
      "xQuery": "山岳部の女子高校生 奥穂高で滑落"
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
