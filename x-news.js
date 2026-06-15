window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T13:08:20.481Z",
  "items": [
    {
      "time": "20:41",
      "title": "米とイランの戦争 何を残したのか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584379?source=rss",
      "publishedAt": "2026-06-15T11:41:57.000Z",
      "xQuery": "米とイランの戦争 何を残したのか"
    },
    {
      "time": "20:19",
      "title": "辺野古転覆 海保が4人を任意聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584373?source=rss",
      "publishedAt": "2026-06-15T11:19:41.000Z",
      "xQuery": "辺野古転覆 海保が4人を任意聴取"
    },
    {
      "time": "20:57",
      "title": "下妻市長死亡 副市長ただただ驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584382?source=rss",
      "publishedAt": "2026-06-15T11:57:42.000Z",
      "xQuery": "下妻市長死亡 副市長ただただ驚き"
    },
    {
      "time": "21:57",
      "title": "三輪乗用車が事故 同乗の4歳重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584387?source=rss",
      "publishedAt": "2026-06-15T12:57:32.000Z",
      "xQuery": "三輪乗用車が事故 同乗の4歳重体"
    },
    {
      "time": "20:53",
      "title": "コストコで食中毒 10歳未満が重症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584381?source=rss",
      "publishedAt": "2026-06-15T11:53:39.000Z",
      "xQuery": "コストコで食中毒 10歳未満が重症"
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
