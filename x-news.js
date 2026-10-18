window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T00:50:09.211Z",
  "items": [
    {
      "time": "08:32",
      "title": "米の対露制裁見送り ウ大統領反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599194?source=rss",
      "publishedAt": "2026-10-17T23:32:57.000Z",
      "xQuery": "米の対露制裁見送り ウ大統領反発"
    },
    {
      "time": "07:37",
      "title": "通販に未認証のチャイルドシート",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599187?source=rss",
      "publishedAt": "2026-10-17T22:37:30.000Z",
      "xQuery": "通販に未認証のチャイルドシート"
    },
    {
      "time": "09:15",
      "title": "中国人観光客 目立つ「大阪離れ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599199?source=rss",
      "publishedAt": "2026-10-18T00:15:28.000Z",
      "xQuery": "中国人観光客 目立つ「大阪離れ」"
    },
    {
      "time": "08:07",
      "title": "死亡事故 無車検の車運転疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599192?source=rss",
      "publishedAt": "2026-10-17T23:07:41.000Z",
      "xQuery": "死亡事故 無車検の車運転疑い逮捕"
    },
    {
      "time": "08:30",
      "title": "シカ衝突し停車 追突され女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599195?source=rss",
      "publishedAt": "2026-10-17T23:30:31.000Z",
      "xQuery": "シカ衝突し停車 追突され女性死亡"
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
