window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T13:22:23.020Z",
  "items": [
    {
      "time": "22:14",
      "title": "廃炉決めた原発の建て替え 目標案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582968?source=rss",
      "publishedAt": "2026-06-04T13:14:08.000Z",
      "xQuery": "廃炉決めた原発の建て替え 目標案"
    },
    {
      "time": "20:18",
      "title": "熱中症疑い 都内で70代男性が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582957?source=rss",
      "publishedAt": "2026-06-04T11:18:05.000Z",
      "xQuery": "熱中症疑い 都内で70代男性が死亡"
    },
    {
      "time": "20:41",
      "title": "内田梨瑚被告が手紙 遺族は拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582961?source=rss",
      "publishedAt": "2026-06-04T11:41:27.000Z",
      "xQuery": "内田梨瑚被告が手紙 遺族は拒否"
    },
    {
      "time": "21:18",
      "title": "京都で米の20歳行方不明 両親胸中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582964?source=rss",
      "publishedAt": "2026-06-04T12:18:33.000Z",
      "xQuery": "京都で米の20歳行方不明 両親胸中"
    },
    {
      "time": "20:05",
      "title": "脱毛大手ミュゼ 破産の舞台裏激白",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582956?source=rss",
      "publishedAt": "2026-06-04T11:05:05.000Z",
      "xQuery": "脱毛大手ミュゼ 破産の舞台裏激白"
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
