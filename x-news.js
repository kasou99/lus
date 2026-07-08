window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T04:37:24.800Z",
  "items": [
    {
      "time": "11:56",
      "title": "旧統一 元職員を新団体で再雇用か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587144?source=rss",
      "publishedAt": "2026-07-08T02:56:51.000Z",
      "xQuery": "旧統一 元職員を新団体で再雇用か"
    },
    {
      "time": "10:01",
      "title": "防衛投資拡大アピール NATO首脳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587133?source=rss",
      "publishedAt": "2026-07-08T01:01:59.000Z",
      "xQuery": "防衛投資拡大アピール NATO首脳"
    },
    {
      "time": "11:34",
      "title": "モナコ爆弾事件 容疑者がウで死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587137?source=rss",
      "publishedAt": "2026-07-08T02:34:09.000Z",
      "xQuery": "モナコ爆弾事件 容疑者がウで死亡"
    },
    {
      "time": "13:09",
      "title": "5000人が250億円投資被害 告訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587157?source=rss",
      "publishedAt": "2026-07-08T04:09:28.000Z",
      "xQuery": "5000人が250億円投資被害 告訴へ"
    },
    {
      "time": "13:19",
      "title": "しまむら戦略奏功 純利益過去最高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587158?source=rss",
      "publishedAt": "2026-07-08T04:19:19.000Z",
      "xQuery": "しまむら戦略奏功 純利益過去最高"
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
