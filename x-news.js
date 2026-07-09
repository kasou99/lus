window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T03:13:56.362Z",
  "items": [
    {
      "time": "11:59",
      "title": "与野党の対立解消 国会の審議再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587279?source=rss",
      "publishedAt": "2026-07-09T02:59:39.000Z",
      "xQuery": "与野党の対立解消 国会の審議再開"
    },
    {
      "time": "11:45",
      "title": "旧安倍派内で主導権争いが活発化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587275?source=rss",
      "publishedAt": "2026-07-09T02:45:26.000Z",
      "xQuery": "旧安倍派内で主導権争いが活発化"
    },
    {
      "time": "11:21",
      "title": "加熱式たばこの規制強化 見送り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587269?source=rss",
      "publishedAt": "2026-07-09T02:21:12.000Z",
      "xQuery": "加熱式たばこの規制強化 見送り"
    },
    {
      "time": "11:15",
      "title": "車にひかれ28歳死亡 ひき逃げか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587270?source=rss",
      "publishedAt": "2026-07-09T02:15:00.000Z",
      "xQuery": "車にひかれ28歳死亡 ひき逃げか"
    },
    {
      "time": "10:37",
      "title": "マンジャロ 処方した精神科の院長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587268?source=rss",
      "publishedAt": "2026-07-09T01:37:43.000Z",
      "xQuery": "マンジャロ 処方した精神科の院長"
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
