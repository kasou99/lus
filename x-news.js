window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T01:14:28.092Z",
  "items": [
    {
      "time": "08:42",
      "title": "能登の復興住宅 建設整備費が高騰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586063?source=rss",
      "publishedAt": "2026-06-28T23:42:43.000Z",
      "xQuery": "能登の復興住宅 建設整備費が高騰"
    },
    {
      "time": "07:53",
      "title": "ブタ腎臓移植 28年にも国内で治験",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586059?source=rss",
      "publishedAt": "2026-06-28T22:53:12.000Z",
      "xQuery": "ブタ腎臓移植 28年にも国内で治験"
    },
    {
      "time": "09:04",
      "title": "近鉄京都駅で脱線 乗客徒歩で移動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586066?source=rss",
      "publishedAt": "2026-06-29T00:04:48.000Z",
      "xQuery": "近鉄京都駅で脱線 乗客徒歩で移動"
    },
    {
      "time": "08:06",
      "title": "ウクライナから新提案 プーチン氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586061?source=rss",
      "publishedAt": "2026-06-28T23:06:39.000Z",
      "xQuery": "ウクライナから新提案 プーチン氏"
    },
    {
      "time": "09:40",
      "title": "風俗店で男女死亡 室内から刃物",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586069?source=rss",
      "publishedAt": "2026-06-29T00:40:42.000Z",
      "xQuery": "風俗店で男女死亡 室内から刃物"
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
