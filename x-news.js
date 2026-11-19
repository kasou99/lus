window.LUS_X_NEWS = {
  "updatedAt": "2026-11-19T02:35:45.301Z",
  "items": [
    {
      "time": "10:50",
      "title": "北朝鮮非難の国連決議 米国が棄権",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603126?source=rss",
      "publishedAt": "2026-11-19T01:50:20.000Z",
      "xQuery": "北朝鮮非難の国連決議 米国が棄権"
    },
    {
      "time": "07:57",
      "title": "米史上初 黒人の下院議長誕生へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603104?source=rss",
      "publishedAt": "2026-11-18T22:57:28.000Z",
      "xQuery": "米史上初 黒人の下院議長誕生へ"
    },
    {
      "time": "11:11",
      "title": "市民デモ相次ぐ仏 警官が抗議デモ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603130?source=rss",
      "publishedAt": "2026-11-19T02:11:01.000Z",
      "xQuery": "市民デモ相次ぐ仏 警官が抗議デモ"
    },
    {
      "time": "11:10",
      "title": "熊本で震度5弱 住民「夜は怖い」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603128?source=rss",
      "publishedAt": "2026-11-19T02:10:38.000Z",
      "xQuery": "熊本で震度5弱 住民「夜は怖い」"
    },
    {
      "time": "10:37",
      "title": "2人死亡事故 容疑者勤務先を捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603123?source=rss",
      "publishedAt": "2026-11-19T01:37:54.000Z",
      "xQuery": "2人死亡事故 容疑者勤務先を捜索"
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
