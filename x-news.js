window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T13:34:08.781Z",
  "items": [
    {
      "time": "21:57",
      "title": "連休最終日は猛暑日エリア拡大か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588559?source=rss",
      "publishedAt": "2026-07-19T12:57:25.000Z",
      "xQuery": "連休最終日は猛暑日エリア拡大か"
    },
    {
      "time": "19:26",
      "title": "日ウ企業間の技術協力 露が批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588544?source=rss",
      "publishedAt": "2026-07-19T10:26:29.000Z",
      "xQuery": "日ウ企業間の技術協力 露が批判"
    },
    {
      "time": "22:13",
      "title": "母娘3人を切りつけ 長男の知人か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588563?source=rss",
      "publishedAt": "2026-07-19T13:13:27.000Z",
      "xQuery": "母娘3人を切りつけ 長男の知人か"
    },
    {
      "time": "20:48",
      "title": "スポーツカーとSUV衝突 2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588552?source=rss",
      "publishedAt": "2026-07-19T11:48:54.000Z",
      "xQuery": "スポーツカーとSUV衝突 2人死亡"
    },
    {
      "time": "21:17",
      "title": "斜面を40m滑落 登山客の男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588555?source=rss",
      "publishedAt": "2026-07-19T12:17:58.000Z",
      "xQuery": "斜面を40m滑落 登山客の男性死亡"
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
