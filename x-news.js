window.LUS_X_NEWS = {
  "updatedAt": "2026-06-23T14:21:32.968Z",
  "items": [
    {
      "time": "22:27",
      "title": "首相 追悼式で相次いだヤジに言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585417?source=rss",
      "publishedAt": "2026-06-23T13:27:24.000Z",
      "xQuery": "首相 追悼式で相次いだヤジに言及"
    },
    {
      "time": "22:55",
      "title": "クールジャパン機構 累損540億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585420?source=rss",
      "publishedAt": "2026-06-23T13:55:56.000Z",
      "xQuery": "クールジャパン機構 累損540億円"
    },
    {
      "time": "22:20",
      "title": "出雲の中心市街地で火災 消火難航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585416?source=rss",
      "publishedAt": "2026-06-23T13:20:47.000Z",
      "xQuery": "出雲の中心市街地で火災 消火難航"
    },
    {
      "time": "22:00",
      "title": "冷凍庫に切断された遺体 元妻逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585411?source=rss",
      "publishedAt": "2026-06-23T13:00:24.000Z",
      "xQuery": "冷凍庫に切断された遺体 元妻逮捕"
    },
    {
      "time": "22:09",
      "title": "4歳が道路に立ちつくす 救った小4",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585410?source=rss",
      "publishedAt": "2026-06-23T13:09:33.000Z",
      "xQuery": "4歳が道路に立ちつくす 救った小4"
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
