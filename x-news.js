window.LUS_X_NEWS = {
  "updatedAt": "2026-07-07T09:48:24.442Z",
  "items": [
    {
      "time": "18:45",
      "title": "西日本豪雨8年 亡き義母への思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587079?source=rss",
      "publishedAt": "2026-07-07T09:45:00.000Z",
      "xQuery": "西日本豪雨8年 亡き義母への思い"
    },
    {
      "time": "16:09",
      "title": "天の川 東北を中心に観測チャンス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587051?source=rss",
      "publishedAt": "2026-07-07T07:09:17.000Z",
      "xQuery": "天の川 東北を中心に観測チャンス"
    },
    {
      "time": "17:17",
      "title": "横浜の上半身のみの遺体 身元判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587067?source=rss",
      "publishedAt": "2026-07-07T08:17:39.000Z",
      "xQuery": "横浜の上半身のみの遺体 身元判明"
    },
    {
      "time": "17:45",
      "title": "はま寿司強い憤り 相次ぐ迷惑行為",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587070?source=rss",
      "publishedAt": "2026-07-07T08:45:03.000Z",
      "xQuery": "はま寿司強い憤り 相次ぐ迷惑行為"
    },
    {
      "time": "16:12",
      "title": "D.O容疑者逮捕 大麻など所持疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587054?source=rss",
      "publishedAt": "2026-07-07T07:12:02.000Z",
      "xQuery": "D.O容疑者逮捕 大麻など所持疑い"
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
