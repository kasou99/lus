window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T05:43:32.358Z",
  "items": [
    {
      "time": "12:32",
      "title": "公明 新代表に岡本三成氏就任へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597050?source=rss",
      "publishedAt": "2026-09-30T03:32:01.000Z",
      "xQuery": "公明 新代表に岡本三成氏就任へ"
    },
    {
      "time": "13:55",
      "title": "モロッコ初の女性首相 組閣へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597059?source=rss",
      "publishedAt": "2026-09-30T04:55:37.000Z",
      "xQuery": "モロッコ初の女性首相 組閣へ"
    },
    {
      "time": "14:29",
      "title": "神戸2カ所で発砲事件 1人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597061?source=rss",
      "publishedAt": "2026-09-30T05:29:31.000Z",
      "xQuery": "神戸2カ所で発砲事件 1人心肺停止"
    },
    {
      "time": "13:48",
      "title": "東武事故 責任者が現場指揮せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597058?source=rss",
      "publishedAt": "2026-09-30T04:48:54.000Z",
      "xQuery": "東武事故 責任者が現場指揮せず"
    },
    {
      "time": "13:38",
      "title": "生成AI動画巡り 声優の請求棄却",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597056?source=rss",
      "publishedAt": "2026-09-30T04:38:19.000Z",
      "xQuery": "生成AI動画巡り 声優の請求棄却"
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
