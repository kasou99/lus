window.LUS_X_NEWS = {
  "updatedAt": "2026-11-14T12:35:04.555Z",
  "items": [
    {
      "time": "20:17",
      "title": "米中露の接近 日本政府は危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602584?source=rss",
      "publishedAt": "2026-11-14T11:17:04.000Z",
      "xQuery": "米中露の接近 日本政府は危機感"
    },
    {
      "time": "19:11",
      "title": "1.5℃目標もう無理? COPの意義は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602577?source=rss",
      "publishedAt": "2026-11-14T10:11:34.000Z",
      "xQuery": "1.5℃目標もう無理? COPの意義は"
    },
    {
      "time": "17:46",
      "title": "菓子屋の倒産最多へ 老舗でも低迷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602566?source=rss",
      "publishedAt": "2026-11-14T08:46:28.000Z",
      "xQuery": "菓子屋の倒産最多へ 老舗でも低迷"
    },
    {
      "time": "18:42",
      "title": "売れ残りを寄付 広がる一方問題も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602572?source=rss",
      "publishedAt": "2026-11-14T09:42:53.000Z",
      "xQuery": "売れ残りを寄付 広がる一方問題も"
    },
    {
      "time": "18:05",
      "title": "宿泊増 鳥取県の「VIVANT」戦略",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602569?source=rss",
      "publishedAt": "2026-11-14T09:05:24.000Z",
      "xQuery": "宿泊増 鳥取県の「VIVANT」戦略"
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
