window.LUS_X_NEWS = {
  "updatedAt": "2026-11-19T23:35:33.271Z",
  "items": [
    {
      "time": "07:35",
      "title": "首相の中国訪問「新ヤルタ」警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603228?source=rss",
      "publishedAt": "2026-11-19T22:35:06.000Z",
      "xQuery": "首相の中国訪問「新ヤルタ」警戒"
    },
    {
      "time": "08:18",
      "title": "21日にかけ寒波 北陸など暴風警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603236?source=rss",
      "publishedAt": "2026-11-19T23:18:13.000Z",
      "xQuery": "21日にかけ寒波 北陸など暴風警戒"
    },
    {
      "time": "07:22",
      "title": "習氏 台湾問題で米大統領をけん制",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603226?source=rss",
      "publishedAt": "2026-11-19T22:22:36.000Z",
      "xQuery": "習氏 台湾問題で米大統領をけん制"
    },
    {
      "time": "07:36",
      "title": "アンソロピック 初日終値約97ドル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603229?source=rss",
      "publishedAt": "2026-11-19T22:36:03.000Z",
      "xQuery": "アンソロピック 初日終値約97ドル"
    },
    {
      "time": "06:42",
      "title": "楽天証券に対し集団訴訟の動き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603224?source=rss",
      "publishedAt": "2026-11-19T21:42:41.000Z",
      "xQuery": "楽天証券に対し集団訴訟の動き"
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
