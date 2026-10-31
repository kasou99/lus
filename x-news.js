window.LUS_X_NEWS = {
  "updatedAt": "2026-10-31T03:35:57.562Z",
  "items": [
    {
      "time": "08:31",
      "title": "消費減税と定数削減 水面下の交渉",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600756?source=rss",
      "publishedAt": "2026-10-30T23:31:21.000Z",
      "xQuery": "消費減税と定数削減 水面下の交渉"
    },
    {
      "time": "08:51",
      "title": "首里城火災7年 11月に正殿公開へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600760?source=rss",
      "publishedAt": "2026-10-30T23:51:46.000Z",
      "xQuery": "首里城火災7年 11月に正殿公開へ"
    },
    {
      "time": "12:13",
      "title": "母娘襲われ重傷 逃走の男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600797?source=rss",
      "publishedAt": "2026-10-31T03:13:32.000Z",
      "xQuery": "母娘襲われ重傷 逃走の男を逮捕"
    },
    {
      "time": "11:42",
      "title": "刑執行失敗の米死刑囚 心境明かす",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600791?source=rss",
      "publishedAt": "2026-10-31T02:42:54.000Z",
      "xQuery": "刑執行失敗の米死刑囚 心境明かす"
    },
    {
      "time": "11:53",
      "title": "列車脱線 衝突のクマ300kgほどか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600790?source=rss",
      "publishedAt": "2026-10-31T02:53:19.000Z",
      "xQuery": "列車脱線 衝突のクマ300kgほどか"
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
