window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T05:13:36.646Z",
  "items": [
    {
      "time": "13:29",
      "title": "北発射のミサイルEEZ外に落下か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600542?source=rss",
      "publishedAt": "2026-10-29T04:29:48.000Z",
      "xQuery": "北発射のミサイルEEZ外に落下か"
    },
    {
      "time": "13:10",
      "title": "餃子の王将社長射殺 検察側が控訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600537?source=rss",
      "publishedAt": "2026-10-29T04:10:22.000Z",
      "xQuery": "餃子の王将社長射殺 検察側が控訴"
    },
    {
      "time": "12:58",
      "title": "GMO社長「犯人特定の有力情報」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600536?source=rss",
      "publishedAt": "2026-10-29T03:58:34.000Z",
      "xQuery": "GMO社長「犯人特定の有力情報」"
    },
    {
      "time": "12:24",
      "title": "性別変更を暴露 市議に賠償命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600525?source=rss",
      "publishedAt": "2026-10-29T03:24:26.000Z",
      "xQuery": "性別変更を暴露 市議に賠償命令"
    },
    {
      "time": "13:52",
      "title": "ピアニスト反田恭平被告 有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600546?source=rss",
      "publishedAt": "2026-10-29T04:52:38.000Z",
      "xQuery": "ピアニスト反田恭平被告 有罪判決"
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
