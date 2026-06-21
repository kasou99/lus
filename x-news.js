window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T05:46:42.323Z",
  "items": [
    {
      "time": "14:41",
      "title": "速報W杯 後半に伊東純也が3点目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585085?source=rss",
      "publishedAt": "2026-06-21T05:41:02.000Z",
      "xQuery": "速報W杯 後半に伊東純也が3点目"
    },
    {
      "time": "11:13",
      "title": "障害福祉運営の不正受給拡大 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585062?source=rss",
      "publishedAt": "2026-06-21T02:13:34.000Z",
      "xQuery": "障害福祉運営の不正受給拡大 なぜ"
    },
    {
      "time": "14:24",
      "title": "冷凍庫から遺体 発見時は凍らず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585081?source=rss",
      "publishedAt": "2026-06-21T05:24:20.000Z",
      "xQuery": "冷凍庫から遺体 発見時は凍らず"
    },
    {
      "time": "13:47",
      "title": "小学校火事 火元から燃えた衣類",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585079?source=rss",
      "publishedAt": "2026-06-21T04:47:31.000Z",
      "xQuery": "小学校火事 火元から燃えた衣類"
    },
    {
      "time": "12:33",
      "title": "中道落選議員 スキマバイトで収入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585069?source=rss",
      "publishedAt": "2026-06-21T03:33:00.000Z",
      "xQuery": "中道落選議員 スキマバイトで収入"
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
