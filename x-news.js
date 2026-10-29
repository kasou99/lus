window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T21:36:44.007Z",
  "items": [
    {
      "time": "21:52",
      "title": "電気ガス代補助 12月-来年2月実施",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600608?source=rss",
      "publishedAt": "2026-10-29T12:52:41.000Z",
      "xQuery": "電気ガス代補助 12月-来年2月実施"
    },
    {
      "time": "23:57",
      "title": "欧州中銀 2会合ぶり金利据え置き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600623?source=rss",
      "publishedAt": "2026-10-29T14:57:12.000Z",
      "xQuery": "欧州中銀 2会合ぶり金利据え置き"
    },
    {
      "time": "06:12",
      "title": "八田與一容疑者の鮮明な写真公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600624?source=rss",
      "publishedAt": "2026-10-29T21:12:54.000Z",
      "xQuery": "八田與一容疑者の鮮明な写真公開"
    },
    {
      "time": "06:02",
      "title": "土砂に埋まり作業員2人死亡 愛知",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600618?source=rss",
      "publishedAt": "2026-10-29T21:02:40.000Z",
      "xQuery": "土砂に埋まり作業員2人死亡 愛知"
    },
    {
      "time": "22:14",
      "title": "天丼てんや 2カ月連続で客約1割減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600612?source=rss",
      "publishedAt": "2026-10-29T13:14:19.000Z",
      "xQuery": "天丼てんや 2カ月連続で客約1割減"
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
