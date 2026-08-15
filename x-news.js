window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T07:42:28.124Z",
  "items": [
    {
      "time": "15:26",
      "title": "戦死の兄のため 追悼式参列の98歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591823?source=rss",
      "publishedAt": "2026-08-15T06:26:01.000Z",
      "xQuery": "戦死の兄のため 追悼式参列の98歳"
    },
    {
      "time": "16:07",
      "title": "戦没者追悼式 式辞に高市カラー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591828?source=rss",
      "publishedAt": "2026-08-15T07:07:20.000Z",
      "xQuery": "戦没者追悼式 式辞に高市カラー"
    },
    {
      "time": "15:50",
      "title": "インドネシア東部で地震 20人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591827?source=rss",
      "publishedAt": "2026-08-15T06:50:16.000Z",
      "xQuery": "インドネシア東部で地震 20人死亡"
    },
    {
      "time": "15:42",
      "title": "海に流された子2人助けに 父死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591826?source=rss",
      "publishedAt": "2026-08-15T06:42:48.000Z",
      "xQuery": "海に流された子2人助けに 父死亡"
    },
    {
      "time": "16:25",
      "title": "マンション爆発事故 住人が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591834?source=rss",
      "publishedAt": "2026-08-15T07:25:57.000Z",
      "xQuery": "マンション爆発事故 住人が死亡"
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
