window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T23:54:55.789Z",
  "items": [
    {
      "time": "07:21",
      "title": "九州～東海 激しい雨や落雷に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586877?source=rss",
      "publishedAt": "2026-07-05T22:21:12.000Z",
      "xQuery": "九州～東海 激しい雨や落雷に注意"
    },
    {
      "time": "08:04",
      "title": "露「制圧」要衝 ウが砲撃停止拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586881?source=rss",
      "publishedAt": "2026-07-05T23:04:48.000Z",
      "xQuery": "露「制圧」要衝 ウが砲撃停止拒否"
    },
    {
      "time": "07:27",
      "title": "防衛省に新たな局を増設へ調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586878?source=rss",
      "publishedAt": "2026-07-05T22:27:14.000Z",
      "xQuery": "防衛省に新たな局を増設へ調整"
    },
    {
      "time": "07:56",
      "title": "「クマ不安」欠席とせず 各地学校",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586882?source=rss",
      "publishedAt": "2026-07-05T22:56:12.000Z",
      "xQuery": "「クマ不安」欠席とせず 各地学校"
    },
    {
      "time": "08:01",
      "title": "6歳の娘を殺害した疑い 父親逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586885?source=rss",
      "publishedAt": "2026-07-05T23:01:38.000Z",
      "xQuery": "6歳の娘を殺害した疑い 父親逮捕"
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
