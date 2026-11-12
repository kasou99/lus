window.LUS_X_NEWS = {
  "updatedAt": "2026-11-12T01:11:43.532Z",
  "items": [
    {
      "time": "07:40",
      "title": "違憲状態解決策見えず 合区に限界",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602244?source=rss",
      "publishedAt": "2026-11-11T22:40:54.000Z",
      "xQuery": "違憲状態解決策見えず 合区に限界"
    },
    {
      "time": "09:12",
      "title": "露ウ 大規模な捕虜交換で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602256?source=rss",
      "publishedAt": "2026-11-12T00:12:28.000Z",
      "xQuery": "露ウ 大規模な捕虜交換で合意"
    },
    {
      "time": "08:20",
      "title": "エヌビディアがCEO解任準備 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602248?source=rss",
      "publishedAt": "2026-11-11T23:20:47.000Z",
      "xQuery": "エヌビディアがCEO解任準備 報道"
    },
    {
      "time": "09:11",
      "title": "EU「ダークパターン」禁止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602254?source=rss",
      "publishedAt": "2026-11-12T00:11:57.000Z",
      "xQuery": "EU「ダークパターン」禁止へ"
    },
    {
      "time": "10:08",
      "title": "イベ閑散波紋 出演料まだ払われず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602265?source=rss",
      "publishedAt": "2026-11-12T01:08:57.000Z",
      "xQuery": "イベ閑散波紋 出演料まだ払われず"
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
