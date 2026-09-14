window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T07:28:06.678Z",
  "items": [
    {
      "time": "14:27",
      "title": "浜岡原発 再稼働の申請取り下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595258?source=rss",
      "publishedAt": "2026-09-14T05:27:50.000Z",
      "xQuery": "浜岡原発 再稼働の申請取り下げ"
    },
    {
      "time": "13:24",
      "title": "東北や北陸 土砂災害や浸水に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595250?source=rss",
      "publishedAt": "2026-09-14T04:24:20.000Z",
      "xQuery": "東北や北陸 土砂災害や浸水に注意"
    },
    {
      "time": "13:03",
      "title": "ガソスタ廃業加速 自治体どう支援",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595231?source=rss",
      "publishedAt": "2026-09-14T04:03:52.000Z",
      "xQuery": "ガソスタ廃業加速 自治体どう支援"
    },
    {
      "time": "13:53",
      "title": "ロマンスカーとコンバインが衝突",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595256?source=rss",
      "publishedAt": "2026-09-14T04:53:49.000Z",
      "xQuery": "ロマンスカーとコンバインが衝突"
    },
    {
      "time": "15:23",
      "title": "閉山中の富士山 ヘリ救助有料化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595261?source=rss",
      "publishedAt": "2026-09-14T06:23:48.000Z",
      "xQuery": "閉山中の富士山 ヘリ救助有料化へ"
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
