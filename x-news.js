window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T02:25:15.934Z",
  "items": [
    {
      "time": "09:17",
      "title": "個人情報保護法改正案 識者が懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585048?source=rss",
      "publishedAt": "2026-06-21T00:17:59.000Z",
      "xQuery": "個人情報保護法改正案 識者が懸念"
    },
    {
      "time": "09:41",
      "title": "闇バイト? 求人見分けるポイント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585055?source=rss",
      "publishedAt": "2026-06-21T00:41:06.000Z",
      "xQuery": "闇バイト? 求人見分けるポイント"
    },
    {
      "time": "11:22",
      "title": "公園で男性刺される 容疑者は逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585064?source=rss",
      "publishedAt": "2026-06-21T02:22:21.000Z",
      "xQuery": "公園で男性刺される 容疑者は逃走"
    },
    {
      "time": "11:14",
      "title": "ヒグマに襲われ 治療に約300万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585063?source=rss",
      "publishedAt": "2026-06-21T02:14:37.000Z",
      "xQuery": "ヒグマに襲われ 治療に約300万円"
    },
    {
      "time": "10:19",
      "title": "中国で流通の「痛金」違法商品も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585058?source=rss",
      "publishedAt": "2026-06-21T01:19:34.000Z",
      "xQuery": "中国で流通の「痛金」違法商品も"
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
