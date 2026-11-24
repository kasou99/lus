window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T00:27:41.141Z",
  "items": [
    {
      "time": "08:10",
      "title": "前線通過 全国的に荒れた天気に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603747?source=rss",
      "publishedAt": "2026-11-23T23:10:25.000Z",
      "xQuery": "前線通過 全国的に荒れた天気に"
    },
    {
      "time": "07:36",
      "title": "3文書改定 経済安保の概要案判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603742?source=rss",
      "publishedAt": "2026-11-23T22:36:05.000Z",
      "xQuery": "3文書改定 経済安保の概要案判明"
    },
    {
      "time": "09:02",
      "title": "フォークリフトが倒れ下敷き 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603756?source=rss",
      "publishedAt": "2026-11-24T00:02:04.000Z",
      "xQuery": "フォークリフトが倒れ下敷き 死亡"
    },
    {
      "time": "07:03",
      "title": "ロッククライミング中に滑落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603737?source=rss",
      "publishedAt": "2026-11-23T22:03:20.000Z",
      "xQuery": "ロッククライミング中に滑落 死亡"
    },
    {
      "time": "07:58",
      "title": "事務職の新卒採用減らす2割 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603745?source=rss",
      "publishedAt": "2026-11-23T22:58:24.000Z",
      "xQuery": "事務職の新卒採用減らす2割 調査"
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
