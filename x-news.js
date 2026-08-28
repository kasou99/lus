window.LUS_X_NEWS = {
  "updatedAt": "2026-08-28T00:32:26.088Z",
  "items": [
    {
      "time": "07:35",
      "title": "熊本地震1カ月 今も約2500人避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593351?source=rss",
      "publishedAt": "2026-08-27T22:35:58.000Z",
      "xQuery": "熊本地震1カ月 今も約2500人避難"
    },
    {
      "time": "07:54",
      "title": "イラン攻撃半年 収束の道筋見えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593354?source=rss",
      "publishedAt": "2026-08-27T22:54:33.000Z",
      "xQuery": "イラン攻撃半年 収束の道筋見えず"
    },
    {
      "time": "07:48",
      "title": "きょう北海道～東海で大雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593353?source=rss",
      "publishedAt": "2026-08-27T22:48:04.000Z",
      "xQuery": "きょう北海道～東海で大雨警戒"
    },
    {
      "time": "08:00",
      "title": "公明も中道への合流見送り視野に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593355?source=rss",
      "publishedAt": "2026-08-27T23:00:49.000Z",
      "xQuery": "公明も中道への合流見送り視野に"
    },
    {
      "time": "09:05",
      "title": "ムラジッチ受刑者が死亡 集団殺害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593358?source=rss",
      "publishedAt": "2026-08-28T00:05:24.000Z",
      "xQuery": "ムラジッチ受刑者が死亡 集団殺害"
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
