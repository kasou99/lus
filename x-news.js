window.LUS_X_NEWS = {
  "updatedAt": "2026-08-17T06:49:31.548Z",
  "items": [
    {
      "time": "13:45",
      "title": "旅館などへの2次避難進まず 熊本",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592057?source=rss",
      "publishedAt": "2026-08-17T04:45:01.000Z",
      "xQuery": "旅館などへの2次避難進まず 熊本"
    },
    {
      "time": "13:51",
      "title": "コンゴ エボラ感染者の約半数死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592059?source=rss",
      "publishedAt": "2026-08-17T04:51:35.000Z",
      "xQuery": "コンゴ エボラ感染者の約半数死亡"
    },
    {
      "time": "14:45",
      "title": "73歳運転 店に車突っ込み2人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592065?source=rss",
      "publishedAt": "2026-08-17T05:45:11.000Z",
      "xQuery": "73歳運転 店に車突っ込み2人けが"
    },
    {
      "time": "09:54",
      "title": "キャッシュレス決済 浸透に地域差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592030?source=rss",
      "publishedAt": "2026-08-17T00:54:18.000Z",
      "xQuery": "キャッシュレス決済 浸透に地域差"
    },
    {
      "time": "14:55",
      "title": "キョン 千葉県から分布拡大の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592066?source=rss",
      "publishedAt": "2026-08-17T05:55:35.000Z",
      "xQuery": "キョン 千葉県から分布拡大の恐れ"
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
