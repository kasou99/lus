window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T03:49:07.064Z",
  "items": [
    {
      "time": "11:19",
      "title": "電気ガス代補助 5000億円支出決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581740?source=rss",
      "publishedAt": "2026-05-26T02:19:22.000Z",
      "xQuery": "電気ガス代補助 5000億円支出決定"
    },
    {
      "time": "11:52",
      "title": "房総半島沖の津波 被害想定を公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581738?source=rss",
      "publishedAt": "2026-05-26T02:52:53.000Z",
      "xQuery": "房総半島沖の津波 被害想定を公表"
    },
    {
      "time": "11:29",
      "title": "プルデンシャル生命 補償に47億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581741?source=rss",
      "publishedAt": "2026-05-26T02:29:06.000Z",
      "xQuery": "プルデンシャル生命 補償に47億円"
    },
    {
      "time": "09:08",
      "title": "マック注文端末巡り物議 広報回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581721?source=rss",
      "publishedAt": "2026-05-26T00:08:27.000Z",
      "xQuery": "マック注文端末巡り物議 広報回答"
    },
    {
      "time": "11:09",
      "title": "今年は蚊が多い? 今始めたい対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581737?source=rss",
      "publishedAt": "2026-05-26T02:09:07.000Z",
      "xQuery": "今年は蚊が多い? 今始めたい対策"
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
