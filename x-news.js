window.LUS_X_NEWS = {
  "updatedAt": "2026-10-21T00:45:19.738Z",
  "items": [
    {
      "time": "07:57",
      "title": "支援金の対象者の案 首相が答弁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599541?source=rss",
      "publishedAt": "2026-10-20T22:57:20.000Z",
      "xQuery": "支援金の対象者の案 首相が答弁"
    },
    {
      "time": "08:22",
      "title": "SpaceXとテスラ 経営統合を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599543?source=rss",
      "publishedAt": "2026-10-20T23:22:38.000Z",
      "xQuery": "SpaceXとテスラ 経営統合を検討"
    },
    {
      "time": "07:50",
      "title": "大阪・名古屋・東京 30℃以上予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599539?source=rss",
      "publishedAt": "2026-10-20T22:50:56.000Z",
      "xQuery": "大阪・名古屋・東京 30℃以上予想"
    },
    {
      "time": "07:39",
      "title": "車が歩道に突っ込む 歩行者が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599538?source=rss",
      "publishedAt": "2026-10-20T22:39:29.000Z",
      "xQuery": "車が歩道に突っ込む 歩行者が死亡"
    },
    {
      "time": "08:42",
      "title": "重機吊り上げ中に車に挟まれ 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599545?source=rss",
      "publishedAt": "2026-10-20T23:42:18.000Z",
      "xQuery": "重機吊り上げ中に車に挟まれ 死亡"
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
