window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T21:50:09.279Z",
  "items": [
    {
      "time": "06:12",
      "title": "米大統領 イラン海上封鎖再開表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587836?source=rss",
      "publishedAt": "2026-07-13T21:12:49.000Z",
      "xQuery": "米大統領 イラン海上封鎖再開表明"
    },
    {
      "time": "21:14",
      "title": "14日 東日本も熱中症リスク高まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587822?source=rss",
      "publishedAt": "2026-07-13T12:14:59.000Z",
      "xQuery": "14日 東日本も熱中症リスク高まる"
    },
    {
      "time": "23:18",
      "title": "全東信破産 465億円超焦げ付きか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587833?source=rss",
      "publishedAt": "2026-07-13T14:18:23.000Z",
      "xQuery": "全東信破産 465億円超焦げ付きか"
    },
    {
      "time": "06:34",
      "title": "5人乗りゴムボート転覆 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587838?source=rss",
      "publishedAt": "2026-07-13T21:34:54.000Z",
      "xQuery": "5人乗りゴムボート転覆 1人死亡"
    },
    {
      "time": "23:50",
      "title": "東京で無差別殺傷を計画疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587835?source=rss",
      "publishedAt": "2026-07-13T14:50:37.000Z",
      "xQuery": "東京で無差別殺傷を計画疑い 逮捕"
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
