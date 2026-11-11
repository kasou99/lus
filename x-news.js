window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T08:35:37.362Z",
  "items": [
    {
      "time": "15:20",
      "title": "昨年7月参院選「違憲状態」最高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602175?source=rss",
      "publishedAt": "2026-11-11T06:20:13.000Z",
      "xQuery": "昨年7月参院選「違憲状態」最高裁"
    },
    {
      "time": "17:17",
      "title": "植松聖死刑囚が再審を請求 3度目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602185?source=rss",
      "publishedAt": "2026-11-11T08:17:56.000Z",
      "xQuery": "植松聖死刑囚が再審を請求 3度目"
    },
    {
      "time": "15:42",
      "title": "横浜の4歳児死亡 男性の無罪確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602176?source=rss",
      "publishedAt": "2026-11-11T06:42:43.000Z",
      "xQuery": "横浜の4歳児死亡 男性の無罪確定"
    },
    {
      "time": "13:22",
      "title": "シルク産業 着る以外の用途に活路",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602160?source=rss",
      "publishedAt": "2026-11-11T04:22:42.000Z",
      "xQuery": "シルク産業 着る以外の用途に活路"
    },
    {
      "time": "16:37",
      "title": "雄牛と雄ロバ 種を越えた交尾行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602181?source=rss",
      "publishedAt": "2026-11-11T07:37:06.000Z",
      "xQuery": "雄牛と雄ロバ 種を越えた交尾行動"
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
