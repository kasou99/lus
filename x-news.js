window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T12:48:23.064Z",
  "items": [
    {
      "time": "21:09",
      "title": "ウ首都に大規模攻撃 18人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586514?source=rss",
      "publishedAt": "2026-07-02T12:09:57.000Z",
      "xQuery": "ウ首都に大規模攻撃 18人死亡"
    },
    {
      "time": "20:09",
      "title": "東京都が手足口病の警報 2年ぶり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586508?source=rss",
      "publishedAt": "2026-07-02T11:09:07.000Z",
      "xQuery": "東京都が手足口病の警報 2年ぶり"
    },
    {
      "time": "21:26",
      "title": "16歳ら逮捕 羽田強盗未遂関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586515?source=rss",
      "publishedAt": "2026-07-02T12:26:52.000Z",
      "xQuery": "16歳ら逮捕 羽田強盗未遂関与か"
    },
    {
      "time": "19:12",
      "title": "2歳虐待死 親が娘を「あほ」呼び",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586501?source=rss",
      "publishedAt": "2026-07-02T10:12:28.000Z",
      "xQuery": "2歳虐待死 親が娘を「あほ」呼び"
    },
    {
      "time": "19:59",
      "title": "「つるし上げ」でいじめ重大事態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586507?source=rss",
      "publishedAt": "2026-07-02T10:59:46.000Z",
      "xQuery": "「つるし上げ」でいじめ重大事態"
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
