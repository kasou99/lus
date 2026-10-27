window.LUS_X_NEWS = {
  "updatedAt": "2026-10-27T22:36:24.615Z",
  "items": [
    {
      "time": "07:04",
      "title": "安保3文書で「拒否力」防衛の柱に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600361?source=rss",
      "publishedAt": "2026-10-27T22:04:42.000Z",
      "xQuery": "安保3文書で「拒否力」防衛の柱に"
    },
    {
      "time": "23:14",
      "title": "GMO不正アクセス 警視庁が捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600351?source=rss",
      "publishedAt": "2026-10-27T14:14:04.000Z",
      "xQuery": "GMO不正アクセス 警視庁が捜査"
    },
    {
      "time": "22:17",
      "title": "25歳店長自殺 スマホに残した動画",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600348?source=rss",
      "publishedAt": "2026-10-27T13:17:18.000Z",
      "xQuery": "25歳店長自殺 スマホに残した動画"
    },
    {
      "time": "06:09",
      "title": "原付の男性死亡 高速道で車と衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600355?source=rss",
      "publishedAt": "2026-10-27T21:09:03.000Z",
      "xQuery": "原付の男性死亡 高速道で車と衝突"
    },
    {
      "time": "07:14",
      "title": "ビルの窓の清掃中に転落か 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600362?source=rss",
      "publishedAt": "2026-10-27T22:14:38.000Z",
      "xQuery": "ビルの窓の清掃中に転落か 死亡"
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
