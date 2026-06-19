window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T07:18:34.577Z",
  "items": [
    {
      "time": "15:50",
      "title": "米イラン19日協議開催せず スイス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584840?source=rss",
      "publishedAt": "2026-06-19T06:50:47.000Z",
      "xQuery": "米イラン19日協議開催せず スイス"
    },
    {
      "time": "15:22",
      "title": "国民投票法改正案が衆院を通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584838?source=rss",
      "publishedAt": "2026-06-19T06:22:17.000Z",
      "xQuery": "国民投票法改正案が衆院を通過"
    },
    {
      "time": "16:00",
      "title": "娘無事か 小学校火災に記者急行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584842?source=rss",
      "publishedAt": "2026-06-19T07:00:29.000Z",
      "xQuery": "娘無事か 小学校火災に記者急行"
    },
    {
      "time": "15:21",
      "title": "新幹線に刃物持った人物か 大宮駅",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584839?source=rss",
      "publishedAt": "2026-06-19T06:21:32.000Z",
      "xQuery": "新幹線に刃物持った人物か 大宮駅"
    },
    {
      "time": "14:57",
      "title": "福岡で女性死亡 刺し傷10カ所以上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584837?source=rss",
      "publishedAt": "2026-06-19T05:57:55.000Z",
      "xQuery": "福岡で女性死亡 刺し傷10カ所以上"
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
