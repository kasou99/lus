window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T07:36:11.285Z",
  "items": [
    {
      "time": "15:43",
      "title": "トヨタ中間決算 3年ぶり営業増益",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601424?source=rss",
      "publishedAt": "2026-11-05T06:43:03.000Z",
      "xQuery": "トヨタ中間決算 3年ぶり営業増益"
    },
    {
      "time": "15:33",
      "title": "バンス氏 米大統領と距離置く姿勢",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601425?source=rss",
      "publishedAt": "2026-11-05T06:33:22.000Z",
      "xQuery": "バンス氏 米大統領と距離置く姿勢"
    },
    {
      "time": "12:52",
      "title": "ドコモ オンラインサービス停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601413?source=rss",
      "publishedAt": "2026-11-05T03:52:36.000Z",
      "xQuery": "ドコモ オンラインサービス停止"
    },
    {
      "time": "15:11",
      "title": "ハリポタ英旗艦店 初日に抗議活動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601419?source=rss",
      "publishedAt": "2026-11-05T06:11:32.000Z",
      "xQuery": "ハリポタ英旗艦店 初日に抗議活動"
    },
    {
      "time": "15:14",
      "title": "「フレネミー」26年流行語候補に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601423?source=rss",
      "publishedAt": "2026-11-05T06:14:13.000Z",
      "xQuery": "「フレネミー」26年流行語候補に"
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
