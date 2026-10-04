window.LUS_X_NEWS = {
  "updatedAt": "2026-10-04T01:27:33.742Z",
  "items": [
    {
      "time": "09:22",
      "title": "那覇強殺 逮捕の米兵は容疑否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597475?source=rss",
      "publishedAt": "2026-10-04T00:22:35.000Z",
      "xQuery": "那覇強殺 逮捕の米兵は容疑否認"
    },
    {
      "time": "08:46",
      "title": "北朝鮮 発射のミサイル「AI導入」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597469?source=rss",
      "publishedAt": "2026-10-03T23:46:14.000Z",
      "xQuery": "北朝鮮 発射のミサイル「AI導入」"
    },
    {
      "time": "09:46",
      "title": "海で9歳重体 救助向かった人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597478?source=rss",
      "publishedAt": "2026-10-04T00:46:15.000Z",
      "xQuery": "海で9歳重体 救助向かった人不明"
    },
    {
      "time": "08:19",
      "title": "オフロードバイクで転倒 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597468?source=rss",
      "publishedAt": "2026-10-03T23:19:30.000Z",
      "xQuery": "オフロードバイクで転倒 男性死亡"
    },
    {
      "time": "07:35",
      "title": "サザン関口氏会社5.8億円申告漏れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597461?source=rss",
      "publishedAt": "2026-10-03T22:35:32.000Z",
      "xQuery": "サザン関口氏会社5.8億円申告漏れ"
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
