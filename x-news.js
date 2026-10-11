window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T14:17:22.583Z",
  "items": [
    {
      "time": "22:14",
      "title": "定数削減 自民幹事長の腹案に波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598430?source=rss",
      "publishedAt": "2026-10-11T13:14:12.000Z",
      "xQuery": "定数削減 自民幹事長の腹案に波紋"
    },
    {
      "time": "22:29",
      "title": "ローマ教皇手術へ 肺のしこり切除",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598431?source=rss",
      "publishedAt": "2026-10-11T13:29:31.000Z",
      "xQuery": "ローマ教皇手術へ 肺のしこり切除"
    },
    {
      "time": "20:08",
      "title": "玄関先でクマに襲われる 眼球破裂",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598416?source=rss",
      "publishedAt": "2026-10-11T11:08:01.000Z",
      "xQuery": "玄関先でクマに襲われる 眼球破裂"
    },
    {
      "time": "22:42",
      "title": "停車前にTXドア開く 客が操作か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598435?source=rss",
      "publishedAt": "2026-10-11T13:42:08.000Z",
      "xQuery": "停車前にTXドア開く 客が操作か"
    },
    {
      "time": "18:45",
      "title": "譲渡会前に保護ネコ妊娠 ボラ葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598408?source=rss",
      "publishedAt": "2026-10-11T09:45:24.000Z",
      "xQuery": "譲渡会前に保護ネコ妊娠 ボラ葛藤"
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
