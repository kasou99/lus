window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T06:19:52.662Z",
  "items": [
    {
      "time": "14:58",
      "title": "日経平均 一時3000円以上の下落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603288?source=rss",
      "publishedAt": "2026-11-20T05:58:26.000Z",
      "xQuery": "日経平均 一時3000円以上の下落"
    },
    {
      "time": "13:34",
      "title": "日中会談はなし 難しい関係修復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603266?source=rss",
      "publishedAt": "2026-11-20T04:34:35.000Z",
      "xQuery": "日中会談はなし 難しい関係修復"
    },
    {
      "time": "14:24",
      "title": "3歳死亡 父のスマホに虐待の動画",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603287?source=rss",
      "publishedAt": "2026-11-20T05:24:29.000Z",
      "xQuery": "3歳死亡 父のスマホに虐待の動画"
    },
    {
      "time": "13:32",
      "title": "ホンダ 新型3列SUVを世界初公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603281?source=rss",
      "publishedAt": "2026-11-20T04:32:04.000Z",
      "xQuery": "ホンダ 新型3列SUVを世界初公開"
    },
    {
      "time": "13:35",
      "title": "駅にサンドイッチ自販機 人気理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603282?source=rss",
      "publishedAt": "2026-11-20T04:35:08.000Z",
      "xQuery": "駅にサンドイッチ自販機 人気理由"
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
