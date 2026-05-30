window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T16:56:40.752Z",
  "items": [
    {
      "time": "23:21",
      "title": "ミサイル共同開発加速で一致 日米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582354?source=rss",
      "publishedAt": "2026-05-30T14:21:37.000Z",
      "xQuery": "ミサイル共同開発加速で一致 日米"
    },
    {
      "time": "21:46",
      "title": "自民と国民の連立構想が再浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582342?source=rss",
      "publishedAt": "2026-05-30T12:46:12.000Z",
      "xQuery": "自民と国民の連立構想が再浮上"
    },
    {
      "time": "22:28",
      "title": "JALとANA 台風で計260便以上欠航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582349?source=rss",
      "publishedAt": "2026-05-30T13:28:52.000Z",
      "xQuery": "JALとANA 台風で計260便以上欠航"
    },
    {
      "time": "21:15",
      "title": "小6の息子殺害疑い 66歳の男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582338?source=rss",
      "publishedAt": "2026-05-30T12:15:28.000Z",
      "xQuery": "小6の息子殺害疑い 66歳の男逮捕"
    },
    {
      "time": "20:04",
      "title": "93歳運転する車がはねる 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582330?source=rss",
      "publishedAt": "2026-05-30T11:04:09.000Z",
      "xQuery": "93歳運転する車がはねる 男性死亡"
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
