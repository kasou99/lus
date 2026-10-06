window.LUS_X_NEWS = {
  "updatedAt": "2026-10-06T00:51:53.669Z",
  "items": [
    {
      "time": "07:58",
      "title": "関東など暑さ戻る 気温変化大きく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597698?source=rss",
      "publishedAt": "2026-10-05T22:58:15.000Z",
      "xQuery": "関東など暑さ戻る 気温変化大きく"
    },
    {
      "time": "08:44",
      "title": "印旛沼決壊 難防除雑草が拡散恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597703?source=rss",
      "publishedAt": "2026-10-05T23:44:54.000Z",
      "xQuery": "印旛沼決壊 難防除雑草が拡散恐れ"
    },
    {
      "time": "07:23",
      "title": "NY州で緊急事態宣言 はしか増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597694?source=rss",
      "publishedAt": "2026-10-05T22:23:55.000Z",
      "xQuery": "NY州で緊急事態宣言 はしか増加"
    },
    {
      "time": "09:16",
      "title": "男性を襲い腕時計奪う 男2人逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597706?source=rss",
      "publishedAt": "2026-10-06T00:16:07.000Z",
      "xQuery": "男性を襲い腕時計奪う 男2人逃走"
    },
    {
      "time": "09:02",
      "title": "逮捕の米兵 被害者と18キロ移動か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597705?source=rss",
      "publishedAt": "2026-10-06T00:02:09.000Z",
      "xQuery": "逮捕の米兵 被害者と18キロ移動か"
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
