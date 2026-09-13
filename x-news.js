window.LUS_X_NEWS = {
  "updatedAt": "2026-09-13T22:15:24.492Z",
  "items": [
    {
      "time": "00:10",
      "title": "古謝氏当選 辺野古容認へ県政転換",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595199?source=rss",
      "publishedAt": "2026-09-13T15:10:35.000Z",
      "xQuery": "古謝氏当選 辺野古容認へ県政転換"
    },
    {
      "time": "23:40",
      "title": "玉城デニー氏 結果受け止める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595198?source=rss",
      "publishedAt": "2026-09-13T14:40:56.000Z",
      "xQuery": "玉城デニー氏 結果受け止める"
    },
    {
      "time": "17:16",
      "title": "極右AfDが勝利 独全土で抗議デモ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595165?source=rss",
      "publishedAt": "2026-09-13T08:16:07.000Z",
      "xQuery": "極右AfDが勝利 独全土で抗議デモ"
    },
    {
      "time": "06:12",
      "title": "事故で車降りた男性 はねられ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595202?source=rss",
      "publishedAt": "2026-09-13T21:12:37.000Z",
      "xQuery": "事故で車降りた男性 はねられ死亡"
    },
    {
      "time": "19:14",
      "title": "性行為したくない 夫婦で言えぬ訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595175?source=rss",
      "publishedAt": "2026-09-13T10:14:55.000Z",
      "xQuery": "性行為したくない 夫婦で言えぬ訳"
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
