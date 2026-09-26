window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T00:48:14.260Z",
  "items": [
    {
      "time": "07:41",
      "title": "関東 昼頃にかけ激しい雨降る所も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596566?source=rss",
      "publishedAt": "2026-09-25T22:41:50.000Z",
      "xQuery": "関東 昼頃にかけ激しい雨降る所も"
    },
    {
      "time": "08:40",
      "title": "外国人の起業 制度厳格化で急減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596569?source=rss",
      "publishedAt": "2026-09-25T23:40:16.000Z",
      "xQuery": "外国人の起業 制度厳格化で急減"
    },
    {
      "time": "07:20",
      "title": "群馬女性死亡 娘の元夫を公開手配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596563?source=rss",
      "publishedAt": "2026-09-25T22:20:14.000Z",
      "xQuery": "群馬女性死亡 娘の元夫を公開手配"
    },
    {
      "time": "08:25",
      "title": "印旛沼決壊 ウナギ「全滅だろう」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596567?source=rss",
      "publishedAt": "2026-09-25T23:25:28.000Z",
      "xQuery": "印旛沼決壊 ウナギ「全滅だろう」"
    },
    {
      "time": "09:17",
      "title": "川におむつ大量投棄疑い 書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596574?source=rss",
      "publishedAt": "2026-09-26T00:17:47.000Z",
      "xQuery": "川におむつ大量投棄疑い 書類送検"
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
