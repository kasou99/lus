window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T22:57:10.125Z",
  "items": [
    {
      "time": "05:30",
      "title": "青森・岩手で震度5弱 津波なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585939?source=rss",
      "publishedAt": "2026-06-27T20:30:59.000Z",
      "xQuery": "青森・岩手で震度5弱 津波なし"
    },
    {
      "time": "07:08",
      "title": "ベネズエラ地震 死者1400人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585942?source=rss",
      "publishedAt": "2026-06-27T22:08:08.000Z",
      "xQuery": "ベネズエラ地震 死者1400人超"
    },
    {
      "time": "23:31",
      "title": "太平洋防衛へ無人潜水艇 政府検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585938?source=rss",
      "publishedAt": "2026-06-27T14:31:15.000Z",
      "xQuery": "太平洋防衛へ無人潜水艇 政府検討"
    },
    {
      "time": "05:55",
      "title": "中露爆撃機が日本周辺を共同飛行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585941?source=rss",
      "publishedAt": "2026-06-27T20:55:28.000Z",
      "xQuery": "中露爆撃機が日本周辺を共同飛行"
    },
    {
      "time": "23:02",
      "title": "タイヤにワイヤー絡まり横転 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585934?source=rss",
      "publishedAt": "2026-06-27T14:02:49.000Z",
      "xQuery": "タイヤにワイヤー絡まり横転 死亡"
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
