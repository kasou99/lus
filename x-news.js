window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T16:19:33.521Z",
  "items": [
    {
      "time": "23:44",
      "title": "台風 強い勢力のまま先島諸島接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599876?source=rss",
      "publishedAt": "2026-10-23T14:44:19.000Z",
      "xQuery": "台風 強い勢力のまま先島諸島接近"
    },
    {
      "time": "23:42",
      "title": "露 ウ南部で一時停戦合意と米発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599879?source=rss",
      "publishedAt": "2026-10-23T14:42:42.000Z",
      "xQuery": "露 ウ南部で一時停戦合意と米発表"
    },
    {
      "time": "21:58",
      "title": "タイムズカー情報流出 集団訴訟へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599864?source=rss",
      "publishedAt": "2026-10-23T12:58:20.000Z",
      "xQuery": "タイムズカー情報流出 集団訴訟へ"
    },
    {
      "time": "22:37",
      "title": "7歳死亡 法廷で母謝罪も無罪主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599865?source=rss",
      "publishedAt": "2026-10-23T13:37:32.000Z",
      "xQuery": "7歳死亡 法廷で母謝罪も無罪主張"
    },
    {
      "time": "21:10",
      "title": "元副議長の証言受け 蔵内氏が反論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599861?source=rss",
      "publishedAt": "2026-10-23T12:10:51.000Z",
      "xQuery": "元副議長の証言受け 蔵内氏が反論"
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
