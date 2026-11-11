window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T05:11:28.744Z",
  "items": [
    {
      "time": "12:38",
      "title": "日中会談の調整不調 日本は正念場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602161?source=rss",
      "publishedAt": "2026-11-11T03:38:54.000Z",
      "xQuery": "日中会談の調整不調 日本は正念場"
    },
    {
      "time": "12:00",
      "title": "高級時計が盗まれた事件 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602150?source=rss",
      "publishedAt": "2026-11-11T03:00:05.000Z",
      "xQuery": "高級時計が盗まれた事件 男を逮捕"
    },
    {
      "time": "11:45",
      "title": "ドコモ携帯 全国で障害が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602147?source=rss",
      "publishedAt": "2026-11-11T02:45:39.000Z",
      "xQuery": "ドコモ携帯 全国で障害が発生"
    },
    {
      "time": "13:58",
      "title": "兄弟転落死 部屋に血の付いた刃物",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602169?source=rss",
      "publishedAt": "2026-11-11T04:58:06.000Z",
      "xQuery": "兄弟転落死 部屋に血の付いた刃物"
    },
    {
      "time": "11:50",
      "title": "「AIくさい」なぜSNSで批判過熱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602141?source=rss",
      "publishedAt": "2026-11-11T02:50:12.000Z",
      "xQuery": "「AIくさい」なぜSNSで批判過熱"
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
