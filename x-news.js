window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T05:25:30.714Z",
  "items": [
    {
      "time": "12:47",
      "title": "米が戦闘終結判断を見送り 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582284?source=rss",
      "publishedAt": "2026-05-30T03:47:46.000Z",
      "xQuery": "米が戦闘終結判断を見送り 報道"
    },
    {
      "time": "13:49",
      "title": "ラオス増水で7人閉じ込め 1人救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582293?source=rss",
      "publishedAt": "2026-05-30T04:49:50.000Z",
      "xQuery": "ラオス増水で7人閉じ込め 1人救助"
    },
    {
      "time": "12:56",
      "title": "日本人の中国旅行大幅減 業界打撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582286?source=rss",
      "publishedAt": "2026-05-30T03:56:22.000Z",
      "xQuery": "日本人の中国旅行大幅減 業界打撃"
    },
    {
      "time": "14:21",
      "title": "車にはねられ2歳死亡 82歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582295?source=rss",
      "publishedAt": "2026-05-30T05:21:30.000Z",
      "xQuery": "車にはねられ2歳死亡 82歳を逮捕"
    },
    {
      "time": "13:23",
      "title": "マンジャロ販売巡り 都の警告話題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582287?source=rss",
      "publishedAt": "2026-05-30T04:23:29.000Z",
      "xQuery": "マンジャロ販売巡り 都の警告話題"
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
