window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T10:38:58.719Z",
  "items": [
    {
      "time": "17:30",
      "title": "首相 米イラン巡る共同声明参加へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584349?source=rss",
      "publishedAt": "2026-06-15T08:30:24.000Z",
      "xQuery": "首相 米イラン巡る共同声明参加へ"
    },
    {
      "time": "16:42",
      "title": "H3ロケット9号機 8月7日打ち上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584341?source=rss",
      "publishedAt": "2026-06-15T07:42:27.000Z",
      "xQuery": "H3ロケット9号機 8月7日打ち上げ"
    },
    {
      "time": "18:59",
      "title": "12歳男児が川でおぼれたか 重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584361?source=rss",
      "publishedAt": "2026-06-15T09:59:37.000Z",
      "xQuery": "12歳男児が川でおぼれたか 重体"
    },
    {
      "time": "18:31",
      "title": "別府ひき逃げ 容疑者の新たな写真",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584358?source=rss",
      "publishedAt": "2026-06-15T09:31:31.000Z",
      "xQuery": "別府ひき逃げ 容疑者の新たな写真"
    },
    {
      "time": "16:52",
      "title": "オリにクマかかるも山に返す 兵庫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584344?source=rss",
      "publishedAt": "2026-06-15T07:52:16.000Z",
      "xQuery": "オリにクマかかるも山に返す 兵庫"
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
