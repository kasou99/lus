window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T14:36:23.478Z",
  "items": [
    {
      "time": "22:49",
      "title": "台風 西日本など中心に天気大荒れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582602?source=rss",
      "publishedAt": "2026-06-01T13:49:44.000Z",
      "xQuery": "台風 西日本など中心に天気大荒れ"
    },
    {
      "time": "22:30",
      "title": "消費減税 来年4月開始で政府調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582597?source=rss",
      "publishedAt": "2026-06-01T13:30:45.000Z",
      "xQuery": "消費減税 来年4月開始で政府調整"
    },
    {
      "time": "22:58",
      "title": "イランが米との連絡停止 現地報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582603?source=rss",
      "publishedAt": "2026-06-01T13:58:17.000Z",
      "xQuery": "イランが米との連絡停止 現地報道"
    },
    {
      "time": "23:03",
      "title": "河口湖で遊泳中 18歳が溺れて死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582604?source=rss",
      "publishedAt": "2026-06-01T14:03:28.000Z",
      "xQuery": "河口湖で遊泳中 18歳が溺れて死亡"
    },
    {
      "time": "20:52",
      "title": "商業施設階段で転落か 警備員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582592?source=rss",
      "publishedAt": "2026-06-01T11:52:44.000Z",
      "xQuery": "商業施設階段で転落か 警備員死亡"
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
