window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T02:36:02.309Z",
  "items": [
    {
      "time": "08:49",
      "title": "ルビオ長官 辞任検討の報道否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601491?source=rss",
      "publishedAt": "2026-11-05T23:49:50.000Z",
      "xQuery": "ルビオ長官 辞任検討の報道否定"
    },
    {
      "time": "09:59",
      "title": "取り調べ拒否24年以降158件 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601499?source=rss",
      "publishedAt": "2026-11-06T00:59:55.000Z",
      "xQuery": "取り調べ拒否24年以降158件 調査"
    },
    {
      "time": "08:53",
      "title": "9月の実質賃金 9カ月連続プラス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601493?source=rss",
      "publishedAt": "2026-11-05T23:53:08.000Z",
      "xQuery": "9月の実質賃金 9カ月連続プラス"
    },
    {
      "time": "09:32",
      "title": "日経平均 一時4000円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601497?source=rss",
      "publishedAt": "2026-11-06T00:32:15.000Z",
      "xQuery": "日経平均 一時4000円以上値下がり"
    },
    {
      "time": "10:04",
      "title": "米加州 死刑囚548人を終身刑に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601498?source=rss",
      "publishedAt": "2026-11-06T01:04:37.000Z",
      "xQuery": "米加州 死刑囚548人を終身刑に"
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
