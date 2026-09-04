window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T09:19:59.109Z",
  "items": [
    {
      "time": "16:24",
      "title": "九州-四国 今夜に線状降水帯恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594213?source=rss",
      "publishedAt": "2026-09-04T07:24:33.000Z",
      "xQuery": "九州-四国 今夜に線状降水帯恐れ"
    },
    {
      "time": "16:05",
      "title": "自衛隊に外国人登用せず 防衛相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594210?source=rss",
      "publishedAt": "2026-09-04T07:05:21.000Z",
      "xQuery": "自衛隊に外国人登用せず 防衛相"
    },
    {
      "time": "16:11",
      "title": "世田谷女性殺害 拘禁刑20年の判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594211?source=rss",
      "publishedAt": "2026-09-04T07:11:22.000Z",
      "xQuery": "世田谷女性殺害 拘禁刑20年の判決"
    },
    {
      "time": "18:01",
      "title": "園バス3歳死 父「やっぱり憎い」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594223?source=rss",
      "publishedAt": "2026-09-04T09:01:35.000Z",
      "xQuery": "園バス3歳死 父「やっぱり憎い」"
    },
    {
      "time": "17:07",
      "title": "福島大をやゆ 動画に文科相が苦言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594218?source=rss",
      "publishedAt": "2026-09-04T08:07:17.000Z",
      "xQuery": "福島大をやゆ 動画に文科相が苦言"
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
