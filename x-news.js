window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T01:13:26.679Z",
  "items": [
    {
      "time": "08:35",
      "title": "ファミリー企業成長へ 初の指針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582997?source=rss",
      "publishedAt": "2026-06-04T23:35:33.000Z",
      "xQuery": "ファミリー企業成長へ 初の指針"
    },
    {
      "time": "09:26",
      "title": "米政府 キューバ大統領らに制裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583004?source=rss",
      "publishedAt": "2026-06-05T00:26:02.000Z",
      "xQuery": "米政府 キューバ大統領らに制裁"
    },
    {
      "time": "08:10",
      "title": "小中高生の理系育成拠点 全県に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582995?source=rss",
      "publishedAt": "2026-06-04T23:10:39.000Z",
      "xQuery": "小中高生の理系育成拠点 全県に"
    },
    {
      "time": "08:57",
      "title": "A・リュウさんに中国圧力 父訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583000?source=rss",
      "publishedAt": "2026-06-04T23:57:31.000Z",
      "xQuery": "A・リュウさんに中国圧力 父訴え"
    },
    {
      "time": "08:26",
      "title": "日本人が拉致? 異色の漫画刊行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582996?source=rss",
      "publishedAt": "2026-06-04T23:26:04.000Z",
      "xQuery": "日本人が拉致? 異色の漫画刊行"
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
