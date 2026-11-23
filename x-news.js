window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T04:15:11.863Z",
  "items": [
    {
      "time": "08:18",
      "title": "攻撃急増 背景にセキュリティ軽視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603626?source=rss",
      "publishedAt": "2026-11-22T23:18:11.000Z",
      "xQuery": "攻撃急増 背景にセキュリティ軽視"
    },
    {
      "time": "10:03",
      "title": "首里城正殿の復元 県知事「万感」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603641?source=rss",
      "publishedAt": "2026-11-23T01:03:54.000Z",
      "xQuery": "首里城正殿の復元 県知事「万感」"
    },
    {
      "time": "12:43",
      "title": "郡山市の中1不明 40人態勢で捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603658?source=rss",
      "publishedAt": "2026-11-23T03:43:12.000Z",
      "xQuery": "郡山市の中1不明 40人態勢で捜索"
    },
    {
      "time": "12:12",
      "title": "謎の迷惑行為「少林寺」拡散背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603654?source=rss",
      "publishedAt": "2026-11-23T03:12:38.000Z",
      "xQuery": "謎の迷惑行為「少林寺」拡散背景"
    },
    {
      "time": "12:34",
      "title": "お湯注ぐだけ「カップご飯」好調",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603656?source=rss",
      "publishedAt": "2026-11-23T03:34:51.000Z",
      "xQuery": "お湯注ぐだけ「カップご飯」好調"
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
