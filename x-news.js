window.LUS_X_NEWS = {
  "updatedAt": "2026-11-05T23:35:13.921Z",
  "items": [
    {
      "time": "08:22",
      "title": "経産省 中部電力に業務改善命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601489?source=rss",
      "publishedAt": "2026-11-05T23:22:48.000Z",
      "xQuery": "経産省 中部電力に業務改善命令"
    },
    {
      "time": "07:30",
      "title": "東北沖で「ひずみ」蓄積再開 研究",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601481?source=rss",
      "publishedAt": "2026-11-05T22:30:52.000Z",
      "xQuery": "東北沖で「ひずみ」蓄積再開 研究"
    },
    {
      "time": "06:25",
      "title": "NYダウ急落 一時1800ドル超安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601477?source=rss",
      "publishedAt": "2026-11-05T21:25:57.000Z",
      "xQuery": "NYダウ急落 一時1800ドル超安"
    },
    {
      "time": "07:25",
      "title": "ドコモ通信障害が復旧 原因を公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601482?source=rss",
      "publishedAt": "2026-11-05T22:25:22.000Z",
      "xQuery": "ドコモ通信障害が復旧 原因を公表"
    },
    {
      "time": "06:56",
      "title": "山梨ダルク代表 1.1億円私的流用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601479?source=rss",
      "publishedAt": "2026-11-05T21:56:52.000Z",
      "xQuery": "山梨ダルク代表 1.1億円私的流用"
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
