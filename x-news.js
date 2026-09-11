window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T19:37:41.603Z",
  "items": [
    {
      "time": "22:46",
      "title": "フーシ派が海峡周辺掌握 原油急騰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594994?source=rss",
      "publishedAt": "2026-09-11T13:46:57.000Z",
      "xQuery": "フーシ派が海峡周辺掌握 原油急騰"
    },
    {
      "time": "22:28",
      "title": "木原氏 岸田氏アンケ巡る発言謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594991?source=rss",
      "publishedAt": "2026-09-11T13:28:24.000Z",
      "xQuery": "木原氏 岸田氏アンケ巡る発言謝罪"
    },
    {
      "time": "23:27",
      "title": "ケーキ店火災 女性オーナーが死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594997?source=rss",
      "publishedAt": "2026-09-11T14:27:47.000Z",
      "xQuery": "ケーキ店火災 女性オーナーが死亡"
    },
    {
      "time": "23:16",
      "title": "海岸に遺体 不明生徒との関連捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594996?source=rss",
      "publishedAt": "2026-09-11T14:16:40.000Z",
      "xQuery": "海岸に遺体 不明生徒との関連捜査"
    },
    {
      "time": "20:57",
      "title": "中国 日本人ビザ約7.5倍に値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594984?source=rss",
      "publishedAt": "2026-09-11T11:57:42.000Z",
      "xQuery": "中国 日本人ビザ約7.5倍に値上げ"
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
