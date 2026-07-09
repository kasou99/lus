window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T04:49:45.157Z",
  "items": [
    {
      "time": "13:05",
      "title": "米軍が追加攻撃完了 イランも報復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587288?source=rss",
      "publishedAt": "2026-07-09T04:05:27.000Z",
      "xQuery": "米軍が追加攻撃完了 イランも報復"
    },
    {
      "time": "12:43",
      "title": "米大統領 イランとの戦争再開否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587283?source=rss",
      "publishedAt": "2026-07-09T03:43:57.000Z",
      "xQuery": "米大統領 イランとの戦争再開否定"
    },
    {
      "time": "12:22",
      "title": "川村葉音被告に懲役30年 検察控訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587281?source=rss",
      "publishedAt": "2026-07-09T03:22:40.000Z",
      "xQuery": "川村葉音被告に懲役30年 検察控訴"
    },
    {
      "time": "11:15",
      "title": "車にひかれ28歳死亡 ひき逃げか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587270?source=rss",
      "publishedAt": "2026-07-09T02:15:00.000Z",
      "xQuery": "車にひかれ28歳死亡 ひき逃げか"
    },
    {
      "time": "12:19",
      "title": "通学中 自転車の12歳はねられ重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587282?source=rss",
      "publishedAt": "2026-07-09T03:19:33.000Z",
      "xQuery": "通学中 自転車の12歳はねられ重体"
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
