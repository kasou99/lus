window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T05:17:27.619Z",
  "items": [
    {
      "time": "13:18",
      "title": "台風 28日にかけ沖縄・奄美に接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596704?source=rss",
      "publishedAt": "2026-09-27T04:18:02.000Z",
      "xQuery": "台風 28日にかけ沖縄・奄美に接近"
    },
    {
      "time": "09:36",
      "title": "バンコク豪雨 全域を災害地域指定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596684?source=rss",
      "publishedAt": "2026-09-27T00:36:46.000Z",
      "xQuery": "バンコク豪雨 全域を災害地域指定"
    },
    {
      "time": "13:38",
      "title": "岩屋前外相らが訪中 関係改善探る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596706?source=rss",
      "publishedAt": "2026-09-27T04:38:03.000Z",
      "xQuery": "岩屋前外相らが訪中 関係改善探る"
    },
    {
      "time": "10:54",
      "title": "混雑率177%も増発できず 3つの壁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596691?source=rss",
      "publishedAt": "2026-09-27T01:54:05.000Z",
      "xQuery": "混雑率177%も増発できず 3つの壁"
    },
    {
      "time": "12:05",
      "title": "エアコンで肌トラブル 温度差注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596697?source=rss",
      "publishedAt": "2026-09-27T03:05:50.000Z",
      "xQuery": "エアコンで肌トラブル 温度差注意"
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
