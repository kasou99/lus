window.LUS_X_NEWS = {
  "updatedAt": "2026-11-13T14:11:35.896Z",
  "items": [
    {
      "time": "19:47",
      "title": "個人向け国債NISA化 見送りで調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602452?source=rss",
      "publishedAt": "2026-11-13T10:47:40.000Z",
      "xQuery": "個人向け国債NISA化 見送りで調整"
    },
    {
      "time": "21:44",
      "title": "大雨被害の由利本荘市 災害死判断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602465?source=rss",
      "publishedAt": "2026-11-13T12:44:56.000Z",
      "xQuery": "大雨被害の由利本荘市 災害死判断"
    },
    {
      "time": "22:14",
      "title": "「週明け怖い」MS障害の影響広く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602468?source=rss",
      "publishedAt": "2026-11-13T13:14:51.000Z",
      "xQuery": "「週明け怖い」MS障害の影響広く"
    },
    {
      "time": "22:18",
      "title": "ワタミがMBO実施へ 320億円程度",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602467?source=rss",
      "publishedAt": "2026-11-13T13:18:38.000Z",
      "xQuery": "ワタミがMBO実施へ 320億円程度"
    },
    {
      "time": "22:52",
      "title": "ひき逃げか 2人死亡で関係者聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602473?source=rss",
      "publishedAt": "2026-11-13T13:52:45.000Z",
      "xQuery": "ひき逃げか 2人死亡で関係者聴取"
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
