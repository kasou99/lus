window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T12:31:32.939Z",
  "items": [
    {
      "time": "20:34",
      "title": "沖縄本島で線状降水帯発生 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581412?source=rss",
      "publishedAt": "2026-05-23T11:34:56.000Z",
      "xQuery": "沖縄本島で線状降水帯発生 警戒を"
    },
    {
      "time": "19:15",
      "title": "LPガス家計支援に1千億円 方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581400?source=rss",
      "publishedAt": "2026-05-23T10:15:56.000Z",
      "xQuery": "LPガス家計支援に1千億円 方針"
    },
    {
      "time": "19:32",
      "title": "民家飼いネコ クマに食べられたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581404?source=rss",
      "publishedAt": "2026-05-23T10:32:04.000Z",
      "xQuery": "民家飼いネコ クマに食べられたか"
    },
    {
      "time": "20:57",
      "title": "サルに次々襲われ 5歳と14歳けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581416?source=rss",
      "publishedAt": "2026-05-23T11:57:31.000Z",
      "xQuery": "サルに次々襲われ 5歳と14歳けが"
    },
    {
      "time": "17:15",
      "title": "近大生経営ラーメン 売上2千万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581386?source=rss",
      "publishedAt": "2026-05-23T08:15:36.000Z",
      "xQuery": "近大生経営ラーメン 売上2千万円"
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
