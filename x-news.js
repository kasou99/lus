window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T03:26:03.547Z",
  "items": [
    {
      "time": "11:45",
      "title": "首相 簗農相を更迭しない方針示す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597972?source=rss",
      "publishedAt": "2026-10-08T02:45:05.000Z",
      "xQuery": "首相 簗農相を更迭しない方針示す"
    },
    {
      "time": "10:22",
      "title": "陸自情報収集 地検に告訴・告発状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597959?source=rss",
      "publishedAt": "2026-10-08T01:22:54.000Z",
      "xQuery": "陸自情報収集 地検に告訴・告発状"
    },
    {
      "time": "12:04",
      "title": "硤合さん受賞 広島の仲間が祝福",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597974?source=rss",
      "publishedAt": "2026-10-08T03:04:45.000Z",
      "xQuery": "硤合さん受賞 広島の仲間が祝福"
    },
    {
      "time": "10:48",
      "title": "湖に転落し中1心肺停止 呼吸回復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597965?source=rss",
      "publishedAt": "2026-10-08T01:48:16.000Z",
      "xQuery": "湖に転落し中1心肺停止 呼吸回復"
    },
    {
      "time": "11:59",
      "title": "千葉酒々井の団地 浸水深なお1m",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597975?source=rss",
      "publishedAt": "2026-10-08T02:59:44.000Z",
      "xQuery": "千葉酒々井の団地 浸水深なお1m"
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
