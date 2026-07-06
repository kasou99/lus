window.LUS_X_NEWS = {
  "updatedAt": "2026-07-06T12:21:20.603Z",
  "items": [
    {
      "time": "21:02",
      "title": "日本政府 中国の軍事動向を注視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586973?source=rss",
      "publishedAt": "2026-07-06T12:02:33.000Z",
      "xQuery": "日本政府 中国の軍事動向を注視"
    },
    {
      "time": "21:03",
      "title": "年金運用が好調 年金財政どうなる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586976?source=rss",
      "publishedAt": "2026-07-06T12:03:37.000Z",
      "xQuery": "年金運用が好調 年金財政どうなる"
    },
    {
      "time": "19:53",
      "title": "愛知で男性刺されて搬送 男が逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586967?source=rss",
      "publishedAt": "2026-07-06T10:53:55.000Z",
      "xQuery": "愛知で男性刺されて搬送 男が逃走"
    },
    {
      "time": "19:29",
      "title": "同居人の唇を縫った疑い 女を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586966?source=rss",
      "publishedAt": "2026-07-06T10:29:48.000Z",
      "xQuery": "同居人の唇を縫った疑い 女を逮捕"
    },
    {
      "time": "19:08",
      "title": "物価高 20代会社員のリアルな弁当",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586963?source=rss",
      "publishedAt": "2026-07-06T10:08:08.000Z",
      "xQuery": "物価高 20代会社員のリアルな弁当"
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
