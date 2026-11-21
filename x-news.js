window.LUS_X_NEWS = {
  "updatedAt": "2026-11-21T12:15:26.244Z",
  "items": [
    {
      "time": "18:51",
      "title": "東北や北陸の山で積雪増へ 注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603445?source=rss",
      "publishedAt": "2026-11-21T09:51:04.000Z",
      "xQuery": "東北や北陸の山で積雪増へ 注意"
    },
    {
      "time": "19:00",
      "title": "政治家パーティー官僚参加 妥当?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603447?source=rss",
      "publishedAt": "2026-11-21T10:00:14.000Z",
      "xQuery": "政治家パーティー官僚参加 妥当?"
    },
    {
      "time": "20:23",
      "title": "参政・神谷宗幣氏 演説に変化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603461?source=rss",
      "publishedAt": "2026-11-21T11:23:52.000Z",
      "xQuery": "参政・神谷宗幣氏 演説に変化"
    },
    {
      "time": "18:55",
      "title": "六花亭 クレカ不正利用を1件確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603448?source=rss",
      "publishedAt": "2026-11-21T09:55:28.000Z",
      "xQuery": "六花亭 クレカ不正利用を1件確認"
    },
    {
      "time": "20:51",
      "title": "夫が酒飲み暴力 謝罪も妻は許せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603465?source=rss",
      "publishedAt": "2026-11-21T11:51:29.000Z",
      "xQuery": "夫が酒飲み暴力 謝罪も妻は許せず"
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
