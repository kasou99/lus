window.LUS_X_NEWS = {
  "updatedAt": "2026-06-05T13:35:26.190Z",
  "items": [
    {
      "time": "21:13",
      "title": "補正予算 国会審議はわずか3日間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583099?source=rss",
      "publishedAt": "2026-06-05T12:13:46.000Z",
      "xQuery": "補正予算 国会審議はわずか3日間"
    },
    {
      "time": "20:46",
      "title": "闇バイト必ず捕まる 未成年に訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583094?source=rss",
      "publishedAt": "2026-06-05T11:46:16.000Z",
      "xQuery": "闇バイト必ず捕まる 未成年に訴え"
    },
    {
      "time": "21:20",
      "title": "燃油サーチャージ 過去最高更新へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583098?source=rss",
      "publishedAt": "2026-06-05T12:20:16.000Z",
      "xQuery": "燃油サーチャージ 過去最高更新へ"
    },
    {
      "time": "21:09",
      "title": "無期懲役求刑 被告の女表情変えず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583096?source=rss",
      "publishedAt": "2026-06-05T12:09:48.000Z",
      "xQuery": "無期懲役求刑 被告の女表情変えず"
    },
    {
      "time": "21:19",
      "title": "路上で作業中の男性に車衝突 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583097?source=rss",
      "publishedAt": "2026-06-05T12:19:05.000Z",
      "xQuery": "路上で作業中の男性に車衝突 死亡"
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
