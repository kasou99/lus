window.LUS_X_NEWS = {
  "updatedAt": "2026-06-08T10:04:16.706Z",
  "items": [
    {
      "time": "18:35",
      "title": "秋葉原殺傷から18年 現場では献花",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583466?source=rss",
      "publishedAt": "2026-06-08T09:35:16.000Z",
      "xQuery": "秋葉原殺傷から18年 現場では献花"
    },
    {
      "time": "18:15",
      "title": "NTT アイオンAIファンド設立方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583463?source=rss",
      "publishedAt": "2026-06-08T09:15:38.000Z",
      "xQuery": "NTT アイオンAIファンド設立方針"
    },
    {
      "time": "17:40",
      "title": "トランプ氏の共和党 離反が拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583448?source=rss",
      "publishedAt": "2026-06-08T08:40:25.000Z",
      "xQuery": "トランプ氏の共和党 離反が拡大"
    },
    {
      "time": "18:29",
      "title": "「退職金」縮小や廃止 なぜ広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583465?source=rss",
      "publishedAt": "2026-06-08T09:29:44.000Z",
      "xQuery": "「退職金」縮小や廃止 なぜ広がる"
    },
    {
      "time": "18:02",
      "title": "浄水場で作業中に生き埋め 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583460?source=rss",
      "publishedAt": "2026-06-08T09:02:38.000Z",
      "xQuery": "浄水場で作業中に生き埋め 死亡"
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
