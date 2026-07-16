window.LUS_X_NEWS = {
  "updatedAt": "2026-07-16T22:50:25.173Z",
  "items": [
    {
      "time": "06:19",
      "title": "近畿や東海中心に猛烈な暑さ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588205?source=rss",
      "publishedAt": "2026-07-16T21:19:16.000Z",
      "xQuery": "近畿や東海中心に猛烈な暑さ 警戒"
    },
    {
      "time": "07:16",
      "title": "所得連動給付 29年度の導入で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588208?source=rss",
      "publishedAt": "2026-07-16T22:16:51.000Z",
      "xQuery": "所得連動給付 29年度の導入で合意"
    },
    {
      "time": "06:44",
      "title": "米 留学生ビザを原則4年に短縮へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588207?source=rss",
      "publishedAt": "2026-07-16T21:44:25.000Z",
      "xQuery": "米 留学生ビザを原則4年に短縮へ"
    },
    {
      "time": "07:34",
      "title": "勾留中に男性死亡 見えてきた経緯",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588212?source=rss",
      "publishedAt": "2026-07-16T22:34:37.000Z",
      "xQuery": "勾留中に男性死亡 見えてきた経緯"
    },
    {
      "time": "06:33",
      "title": "米大統領 サッカーW杯決勝観戦へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588206?source=rss",
      "publishedAt": "2026-07-16T21:33:45.000Z",
      "xQuery": "米大統領 サッカーW杯決勝観戦へ"
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
