window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T09:12:18.991Z",
  "items": [
    {
      "time": "17:00",
      "title": "米大統領 敗因巡りイラン攻撃言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601315?source=rss",
      "publishedAt": "2026-11-04T08:00:55.000Z",
      "xQuery": "米大統領 敗因巡りイラン攻撃言及"
    },
    {
      "time": "16:53",
      "title": "黒人女性が州知事に当選確実 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601313?source=rss",
      "publishedAt": "2026-11-04T07:53:10.000Z",
      "xQuery": "黒人女性が州知事に当選確実 米"
    },
    {
      "time": "16:50",
      "title": "津市の火災 死亡の4人は4～13歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601309?source=rss",
      "publishedAt": "2026-11-04T07:50:11.000Z",
      "xQuery": "津市の火災 死亡の4人は4～13歳"
    },
    {
      "time": "18:01",
      "title": "重機が倒れ頭挟まれる 作業員死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601321?source=rss",
      "publishedAt": "2026-11-04T09:01:50.000Z",
      "xQuery": "重機が倒れ頭挟まれる 作業員死亡"
    },
    {
      "time": "12:06",
      "title": "カスハラ対策 線引きに迷う現場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601276?source=rss",
      "publishedAt": "2026-11-04T03:06:51.000Z",
      "xQuery": "カスハラ対策 線引きに迷う現場"
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
