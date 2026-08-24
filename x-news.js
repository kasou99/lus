window.LUS_X_NEWS = {
  "updatedAt": "2026-08-24T05:18:20.583Z",
  "items": [
    {
      "time": "11:58",
      "title": "猛暑日が続出 西日本で危険な暑さ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592859?source=rss",
      "publishedAt": "2026-08-24T02:58:02.000Z",
      "xQuery": "猛暑日が続出 西日本で危険な暑さ"
    },
    {
      "time": "13:22",
      "title": "売春防止法 買う側の勧誘も処罰案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592873?source=rss",
      "publishedAt": "2026-08-24T04:22:46.000Z",
      "xQuery": "売春防止法 買う側の勧誘も処罰案"
    },
    {
      "time": "12:38",
      "title": "東武4人死亡 兄「納得できない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592869?source=rss",
      "publishedAt": "2026-08-24T03:38:21.000Z",
      "xQuery": "東武4人死亡 兄「納得できない」"
    },
    {
      "time": "13:27",
      "title": "高2が死亡 殴られたようなあと",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592874?source=rss",
      "publishedAt": "2026-08-24T04:27:08.000Z",
      "xQuery": "高2が死亡 殴られたようなあと"
    },
    {
      "time": "14:04",
      "title": "3歳落とし骨折させた疑い 母逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592877?source=rss",
      "publishedAt": "2026-08-24T05:04:42.000Z",
      "xQuery": "3歳落とし骨折させた疑い 母逮捕"
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
