window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T23:37:34.886Z",
  "items": [
    {
      "time": "06:06",
      "title": "関東～四国で線状降水帯の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594693?source=rss",
      "publishedAt": "2026-09-08T21:06:02.000Z",
      "xQuery": "関東～四国で線状降水帯の恐れ"
    },
    {
      "time": "07:41",
      "title": "米軍 イラン関連タンカーを攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594700?source=rss",
      "publishedAt": "2026-09-08T22:41:26.000Z",
      "xQuery": "米軍 イラン関連タンカーを攻撃"
    },
    {
      "time": "06:14",
      "title": "大雨 名古屋では多くの帰宅困難者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594694?source=rss",
      "publishedAt": "2026-09-08T21:14:03.000Z",
      "xQuery": "大雨 名古屋では多くの帰宅困難者"
    },
    {
      "time": "07:39",
      "title": "血を流した男性死亡 ひき逃げか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594701?source=rss",
      "publishedAt": "2026-09-08T22:39:52.000Z",
      "xQuery": "血を流した男性死亡 ひき逃げか"
    },
    {
      "time": "08:34",
      "title": "折り畳み式iPhone 開発に約10年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594706?source=rss",
      "publishedAt": "2026-09-08T23:34:50.000Z",
      "xQuery": "折り畳み式iPhone 開発に約10年"
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
