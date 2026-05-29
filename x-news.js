window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T12:07:34.848Z",
  "items": [
    {
      "time": "19:48",
      "title": "為替介入11.7兆円 月間で過去最大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582215?source=rss",
      "publishedAt": "2026-05-29T10:48:48.000Z",
      "xQuery": "為替介入11.7兆円 月間で過去最大"
    },
    {
      "time": "17:46",
      "title": "個人の申告所得合計 バブル期迫る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582196?source=rss",
      "publishedAt": "2026-05-29T08:46:21.000Z",
      "xQuery": "個人の申告所得合計 バブル期迫る"
    },
    {
      "time": "21:04",
      "title": "サンリオ常務の不適切受給2.5億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582221?source=rss",
      "publishedAt": "2026-05-29T12:04:38.000Z",
      "xQuery": "サンリオ常務の不適切受給2.5億円"
    },
    {
      "time": "20:23",
      "title": "マイクロバスが2人はねる 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582216?source=rss",
      "publishedAt": "2026-05-29T11:23:21.000Z",
      "xQuery": "マイクロバスが2人はねる 1人死亡"
    },
    {
      "time": "20:52",
      "title": "自転車15歳死亡 ひき逃げ疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582219?source=rss",
      "publishedAt": "2026-05-29T11:52:45.000Z",
      "xQuery": "自転車15歳死亡 ひき逃げ疑い逮捕"
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
