window.LUS_X_NEWS = {
  "updatedAt": "2026-11-16T17:10:04.660Z",
  "items": [
    {
      "time": "23:25",
      "title": "3カ国会談巡り中国「戦勝国」強調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602847?source=rss",
      "publishedAt": "2026-11-16T14:25:07.000Z",
      "xQuery": "3カ国会談巡り中国「戦勝国」強調"
    },
    {
      "time": "23:00",
      "title": "はやぶさ2に不具合 目的地を変更",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602844?source=rss",
      "publishedAt": "2026-11-16T14:00:45.000Z",
      "xQuery": "はやぶさ2に不具合 目的地を変更"
    },
    {
      "time": "23:51",
      "title": "中野死亡 男は女性が勤める店の客",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602848?source=rss",
      "publishedAt": "2026-11-16T14:51:54.000Z",
      "xQuery": "中野死亡 男は女性が勤める店の客"
    },
    {
      "time": "22:39",
      "title": "元モデル死亡 男は「自傷」と説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602842?source=rss",
      "publishedAt": "2026-11-16T13:39:59.000Z",
      "xQuery": "元モデル死亡 男は「自傷」と説明"
    },
    {
      "time": "22:31",
      "title": "卵サンドつかむ客動画炎上 店説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602840?source=rss",
      "publishedAt": "2026-11-16T13:31:14.000Z",
      "xQuery": "卵サンドつかむ客動画炎上 店説明"
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
