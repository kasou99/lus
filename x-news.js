window.LUS_X_NEWS = {
  "updatedAt": "2026-09-12T23:37:05.913Z",
  "items": [
    {
      "time": "07:48",
      "title": "国対委員長に村井英樹氏 首相意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595108?source=rss",
      "publishedAt": "2026-09-12T22:48:12.000Z",
      "xQuery": "国対委員長に村井英樹氏 首相意向"
    },
    {
      "time": "07:35",
      "title": "AnthropicCEO AI開発の減速訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595106?source=rss",
      "publishedAt": "2026-09-12T22:35:27.000Z",
      "xQuery": "AnthropicCEO AI開発の減速訴え"
    },
    {
      "time": "07:44",
      "title": "車にはねられ約7m下に転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595107?source=rss",
      "publishedAt": "2026-09-12T22:44:41.000Z",
      "xQuery": "車にはねられ約7m下に転落 死亡"
    },
    {
      "time": "07:22",
      "title": "富士山 閉山後でも海外の団体客",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595103?source=rss",
      "publishedAt": "2026-09-12T22:22:41.000Z",
      "xQuery": "富士山 閉山後でも海外の団体客"
    },
    {
      "time": "08:13",
      "title": "赤信号渡る3歳を小2発見 母と保護",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595112?source=rss",
      "publishedAt": "2026-09-12T23:13:29.000Z",
      "xQuery": "赤信号渡る3歳を小2発見 母と保護"
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
