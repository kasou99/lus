window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T12:48:46.967Z",
  "items": [
    {
      "time": "20:54",
      "title": "血で染まった洗面器 8/9の記憶",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591122?source=rss",
      "publishedAt": "2026-08-09T11:54:27.000Z",
      "xQuery": "血で染まった洗面器 8/9の記憶"
    },
    {
      "time": "19:29",
      "title": "米軍 熊本に飲料水約16トン支援",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591114?source=rss",
      "publishedAt": "2026-08-09T10:29:37.000Z",
      "xQuery": "米軍 熊本に飲料水約16トン支援"
    },
    {
      "time": "20:03",
      "title": "長崎市長 平和宣言1文読み飛ばし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591118?source=rss",
      "publishedAt": "2026-08-09T11:03:34.000Z",
      "xQuery": "長崎市長 平和宣言1文読み飛ばし"
    },
    {
      "time": "20:48",
      "title": "槍ヶ岳に遺体 不明の19歳と判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591123?source=rss",
      "publishedAt": "2026-08-09T11:48:45.000Z",
      "xQuery": "槍ヶ岳に遺体 不明の19歳と判明"
    },
    {
      "time": "10:46",
      "title": "阿波おどりで不適切な動画 憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591066?source=rss",
      "publishedAt": "2026-08-09T01:46:46.000Z",
      "xQuery": "阿波おどりで不適切な動画 憤り"
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
