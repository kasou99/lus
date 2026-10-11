window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T00:59:18.710Z",
  "items": [
    {
      "time": "09:19",
      "title": "農相 当選重ねるごと「態度変化」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598332?source=rss",
      "publishedAt": "2026-10-11T00:19:45.000Z",
      "xQuery": "農相 当選重ねるごと「態度変化」"
    },
    {
      "time": "08:10",
      "title": "サウジ首都の空港に攻撃 12人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598321?source=rss",
      "publishedAt": "2026-10-10T23:10:14.000Z",
      "xQuery": "サウジ首都の空港に攻撃 12人死亡"
    },
    {
      "time": "09:05",
      "title": "銃殺刑の配信 トランプ氏が判断へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598331?source=rss",
      "publishedAt": "2026-10-11T00:05:45.000Z",
      "xQuery": "銃殺刑の配信 トランプ氏が判断へ"
    },
    {
      "time": "07:55",
      "title": "障害者50人 9カ月で雇用打ち切り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598316?source=rss",
      "publishedAt": "2026-10-10T22:55:09.000Z",
      "xQuery": "障害者50人 9カ月で雇用打ち切り"
    },
    {
      "time": "08:21",
      "title": "子供は毎日湯船つかるべき? 解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598325?source=rss",
      "publishedAt": "2026-10-10T23:21:47.000Z",
      "xQuery": "子供は毎日湯船つかるべき? 解説"
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
