window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T12:25:25.843Z",
  "items": [
    {
      "time": "20:15",
      "title": "内閣支持率が41%に大幅下落 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588550?source=rss",
      "publishedAt": "2026-07-19T11:15:04.000Z",
      "xQuery": "内閣支持率が41%に大幅下落 毎日"
    },
    {
      "time": "20:55",
      "title": "栃木土砂崩れ 男性1人の遺体発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588553?source=rss",
      "publishedAt": "2026-07-19T11:55:17.000Z",
      "xQuery": "栃木土砂崩れ 男性1人の遺体発見"
    },
    {
      "time": "20:11",
      "title": "倒木で7人搬送「バーンと倒れた」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588548?source=rss",
      "publishedAt": "2026-07-19T11:11:22.000Z",
      "xQuery": "倒木で7人搬送「バーンと倒れた」"
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
