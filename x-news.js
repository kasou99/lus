window.LUS_X_NEWS = {
  "updatedAt": "2026-08-28T10:38:26.277Z",
  "items": [
    {
      "time": "18:17",
      "title": "北陸や東北で警報級大雨恐れ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593425?source=rss",
      "publishedAt": "2026-08-28T09:17:42.000Z",
      "xQuery": "北陸や東北で警報級大雨恐れ 警戒"
    },
    {
      "time": "17:27",
      "title": "市岡元気 家庭苦しくても夢諦めず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593416?source=rss",
      "publishedAt": "2026-08-28T08:27:26.000Z",
      "xQuery": "市岡元気 家庭苦しくても夢諦めず"
    },
    {
      "time": "18:25",
      "title": "中高生流され3人行方不明 鹿児島",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593429?source=rss",
      "publishedAt": "2026-08-28T09:25:13.000Z",
      "xQuery": "中高生流され3人行方不明 鹿児島"
    },
    {
      "time": "18:18",
      "title": "小学校でひき逃げか 児童の父憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593426?source=rss",
      "publishedAt": "2026-08-28T09:18:04.000Z",
      "xQuery": "小学校でひき逃げか 児童の父憤り"
    },
    {
      "time": "18:59",
      "title": "大阪知事 USJ拡張意向聞いていた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593431?source=rss",
      "publishedAt": "2026-08-28T09:59:00.000Z",
      "xQuery": "大阪知事 USJ拡張意向聞いていた"
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
