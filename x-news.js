window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T03:21:32.624Z",
  "items": [
    {
      "time": "11:58",
      "title": "九州・四国 大規模な大雨災害恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594189?source=rss",
      "publishedAt": "2026-09-04T02:58:20.000Z",
      "xQuery": "九州・四国 大規模な大雨災害恐れ"
    },
    {
      "time": "11:57",
      "title": "27年度予算要求 過去最大143兆円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594188?source=rss",
      "publishedAt": "2026-09-04T02:57:11.000Z",
      "xQuery": "27年度予算要求 過去最大143兆円"
    },
    {
      "time": "11:03",
      "title": "イオン爆発 避難後に客も再入館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594178?source=rss",
      "publishedAt": "2026-09-04T02:03:36.000Z",
      "xQuery": "イオン爆発 避難後に客も再入館"
    },
    {
      "time": "10:42",
      "title": "「まんじゅうや」票無効 市民の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594177?source=rss",
      "publishedAt": "2026-09-04T01:42:24.000Z",
      "xQuery": "「まんじゅうや」票無効 市民の声"
    },
    {
      "time": "11:37",
      "title": "相手の草刈り機の刃があたる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594186?source=rss",
      "publishedAt": "2026-09-04T02:37:08.000Z",
      "xQuery": "相手の草刈り機の刃があたる 死亡"
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
