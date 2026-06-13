window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T03:19:08.721Z",
  "items": [
    {
      "time": "11:07",
      "title": "Anthropic ミュトス級AI提供停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584060?source=rss",
      "publishedAt": "2026-06-13T02:07:22.000Z",
      "xQuery": "Anthropic ミュトス級AI提供停止"
    },
    {
      "time": "09:41",
      "title": "宮城周辺 800年前未知の大津波か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584050?source=rss",
      "publishedAt": "2026-06-13T00:41:38.000Z",
      "xQuery": "宮城周辺 800年前未知の大津波か"
    },
    {
      "time": "09:35",
      "title": "スペースX 従業員がミリオネアに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584048?source=rss",
      "publishedAt": "2026-06-13T00:35:25.000Z",
      "xQuery": "スペースX 従業員がミリオネアに"
    },
    {
      "time": "11:54",
      "title": "宇都宮にクマ「予言」の識者警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584064?source=rss",
      "publishedAt": "2026-06-13T02:54:33.000Z",
      "xQuery": "宇都宮にクマ「予言」の識者警鐘"
    },
    {
      "time": "11:53",
      "title": "東京都心の空に現象「ハロ」出現",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584061?source=rss",
      "publishedAt": "2026-06-13T02:53:05.000Z",
      "xQuery": "東京都心の空に現象「ハロ」出現"
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
