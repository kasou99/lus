window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T09:56:18.377Z",
  "items": [
    {
      "time": "18:35",
      "title": "墜落 520人の墓標に花生けた遺族",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591473?source=rss",
      "publishedAt": "2026-08-12T09:35:17.000Z",
      "xQuery": "墜落 520人の墓標に花生けた遺族"
    },
    {
      "time": "17:12",
      "title": "辺野古 運航団体関係先を家宅捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591461?source=rss",
      "publishedAt": "2026-08-12T08:12:53.000Z",
      "xQuery": "辺野古 運航団体関係先を家宅捜索"
    },
    {
      "time": "17:18",
      "title": "移住先で夫不貞 離婚し生き方模索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591464?source=rss",
      "publishedAt": "2026-08-12T08:18:42.000Z",
      "xQuery": "移住先で夫不貞 離婚し生き方模索"
    },
    {
      "time": "17:18",
      "title": "印の旅客機急降下 機長は大麻陽性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591463?source=rss",
      "publishedAt": "2026-08-12T08:18:02.000Z",
      "xQuery": "印の旅客機急降下 機長は大麻陽性"
    },
    {
      "time": "16:37",
      "title": "ペルセウス座流星群 今夜から見頃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591458?source=rss",
      "publishedAt": "2026-08-12T07:37:06.000Z",
      "xQuery": "ペルセウス座流星群 今夜から見頃"
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
