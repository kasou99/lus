window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T22:37:03.825Z",
  "items": [
    {
      "time": "06:54",
      "title": "森保J スウェーデン戦のスタメン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585678?source=rss",
      "publishedAt": "2026-06-25T21:54:33.000Z",
      "xQuery": "森保J スウェーデン戦のスタメン"
    },
    {
      "time": "06:08",
      "title": "台風7号 沖縄は暴風と大雨に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585675?source=rss",
      "publishedAt": "2026-06-25T21:08:20.000Z",
      "xQuery": "台風7号 沖縄は暴風と大雨に警戒"
    },
    {
      "time": "06:29",
      "title": "ベネズエラ地震 数千人死亡の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585677?source=rss",
      "publishedAt": "2026-06-25T21:29:51.000Z",
      "xQuery": "ベネズエラ地震 数千人死亡の恐れ"
    },
    {
      "time": "06:16",
      "title": "毒物カレー事件 林死刑囚の夫死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585676?source=rss",
      "publishedAt": "2026-06-25T21:16:36.000Z",
      "xQuery": "毒物カレー事件 林死刑囚の夫死去"
    },
    {
      "time": "23:41",
      "title": "スクールバス逆走し事故 12人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585674?source=rss",
      "publishedAt": "2026-06-25T14:41:18.000Z",
      "xQuery": "スクールバス逆走し事故 12人搬送"
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
