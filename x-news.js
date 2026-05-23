window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T14:38:29.743Z",
  "items": [
    {
      "time": "21:12",
      "title": "赤沢経産相 中国商務相と立ち話",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581418?source=rss",
      "publishedAt": "2026-05-23T12:12:14.000Z",
      "xQuery": "赤沢経産相 中国商務相と立ち話"
    },
    {
      "time": "23:22",
      "title": "土砂崩れ一部封鎖 沖縄で10人孤立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581433?source=rss",
      "publishedAt": "2026-05-23T14:22:08.000Z",
      "xQuery": "土砂崩れ一部封鎖 沖縄で10人孤立"
    },
    {
      "time": "22:44",
      "title": "辺野古事故 沖縄知事が文科省批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581430?source=rss",
      "publishedAt": "2026-05-23T13:44:53.000Z",
      "xQuery": "辺野古事故 沖縄知事が文科省批判"
    },
    {
      "time": "22:47",
      "title": "スーパーで男性刺される 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581431?source=rss",
      "publishedAt": "2026-05-23T13:47:17.000Z",
      "xQuery": "スーパーで男性刺される 男を逮捕"
    },
    {
      "time": "22:40",
      "title": "森保Jアウェーユニ爆売れ 驚きも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581429?source=rss",
      "publishedAt": "2026-05-23T13:40:42.000Z",
      "xQuery": "森保Jアウェーユニ爆売れ 驚きも"
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
