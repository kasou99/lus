window.LUS_X_NEWS = {
  "updatedAt": "2026-08-06T06:01:40.250Z",
  "items": [
    {
      "time": "14:21",
      "title": "安保3文書改定 予断控えると首相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590737?source=rss",
      "publishedAt": "2026-08-06T05:21:04.000Z",
      "xQuery": "安保3文書改定 予断控えると首相"
    },
    {
      "time": "11:52",
      "title": "皮ズルズルに剥けた人も 原爆光景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590712?source=rss",
      "publishedAt": "2026-08-06T02:52:21.000Z",
      "xQuery": "皮ズルズルに剥けた人も 原爆光景"
    },
    {
      "time": "14:14",
      "title": "九州新幹線復旧 8月中に時期示す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590736?source=rss",
      "publishedAt": "2026-08-06T05:14:40.000Z",
      "xQuery": "九州新幹線復旧 8月中に時期示す"
    },
    {
      "time": "14:04",
      "title": "外国人採用のアンケ 県が差別否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590733?source=rss",
      "publishedAt": "2026-08-06T05:04:02.000Z",
      "xQuery": "外国人採用のアンケ 県が差別否定"
    },
    {
      "time": "14:00",
      "title": "メタAIモデルも外部システム侵入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590734?source=rss",
      "publishedAt": "2026-08-06T05:00:16.000Z",
      "xQuery": "メタAIモデルも外部システム侵入"
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
