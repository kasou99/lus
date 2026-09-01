window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T00:59:11.003Z",
  "items": [
    {
      "time": "08:33",
      "title": "9月も厳しい残暑 熱中症に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593807?source=rss",
      "publishedAt": "2026-08-31T23:33:00.000Z",
      "xQuery": "9月も厳しい残暑 熱中症に警戒"
    },
    {
      "time": "09:39",
      "title": "長期金利一時2.955% 30年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593818?source=rss",
      "publishedAt": "2026-09-01T00:39:37.000Z",
      "xQuery": "長期金利一時2.955% 30年ぶり水準"
    },
    {
      "time": "09:39",
      "title": "旧統一教会解散 韓国でも現実味",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593816?source=rss",
      "publishedAt": "2026-09-01T00:39:52.000Z",
      "xQuery": "旧統一教会解散 韓国でも現実味"
    },
    {
      "time": "07:31",
      "title": "車2台が正面衝突し1人死亡 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593801?source=rss",
      "publishedAt": "2026-08-31T22:31:09.000Z",
      "xQuery": "車2台が正面衝突し1人死亡 男逮捕"
    },
    {
      "time": "09:54",
      "title": "高校で車横転 生徒の遺族が提訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593821?source=rss",
      "publishedAt": "2026-09-01T00:54:26.000Z",
      "xQuery": "高校で車横転 生徒の遺族が提訴へ"
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
