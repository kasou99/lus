window.LUS_X_NEWS = {
  "updatedAt": "2026-11-13T15:10:27.663Z",
  "items": [
    {
      "time": "23:48",
      "title": "自衛官の給与引き上げ法が成立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602480?source=rss",
      "publishedAt": "2026-11-13T14:48:03.000Z",
      "xQuery": "自衛官の給与引き上げ法が成立"
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
      "time": "23:16",
      "title": "MS障害 日本は比較的安定状態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602477?source=rss",
      "publishedAt": "2026-11-13T14:16:12.000Z",
      "xQuery": "MS障害 日本は比較的安定状態"
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
