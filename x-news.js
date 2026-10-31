window.LUS_X_NEWS = {
  "updatedAt": "2026-10-31T12:35:12.150Z",
  "items": [
    {
      "time": "18:04",
      "title": "高市氏ら首相の予算委答弁数 比較",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600843?source=rss",
      "publishedAt": "2026-10-31T09:04:33.000Z",
      "xQuery": "高市氏ら首相の予算委答弁数 比較"
    },
    {
      "time": "19:38",
      "title": "スペイン運輸相 追突列車は青信号",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600855?source=rss",
      "publishedAt": "2026-10-31T10:38:10.000Z",
      "xQuery": "スペイン運輸相 追突列車は青信号"
    },
    {
      "time": "21:20",
      "title": "参政・神谷氏 独AfD幹部と共鳴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600861?source=rss",
      "publishedAt": "2026-10-31T12:20:14.000Z",
      "xQuery": "参政・神谷氏 独AfD幹部と共鳴"
    },
    {
      "time": "20:51",
      "title": "屋根の修理中に転落か 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600858?source=rss",
      "publishedAt": "2026-10-31T11:51:48.000Z",
      "xQuery": "屋根の修理中に転落か 男性死亡"
    },
    {
      "time": "17:56",
      "title": "ブラックフライデー 先行セールも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600845?source=rss",
      "publishedAt": "2026-10-31T08:56:45.000Z",
      "xQuery": "ブラックフライデー 先行セールも"
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
