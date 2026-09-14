window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T08:48:35.206Z",
  "items": [
    {
      "time": "17:19",
      "title": "イオン爆発 事故調査委が現地調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595275?source=rss",
      "publishedAt": "2026-09-14T08:19:32.000Z",
      "xQuery": "イオン爆発 事故調査委が現地調査"
    },
    {
      "time": "17:05",
      "title": "森衆院議長キーウ訪問 連帯表明へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595271?source=rss",
      "publishedAt": "2026-09-14T08:05:55.000Z",
      "xQuery": "森衆院議長キーウ訪問 連帯表明へ"
    },
    {
      "time": "16:43",
      "title": "新たな台風発生へ 連休に影響恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595273?source=rss",
      "publishedAt": "2026-09-14T07:43:12.000Z",
      "xQuery": "新たな台風発生へ 連休に影響恐れ"
    },
    {
      "time": "15:23",
      "title": "閉山中の富士山 ヘリ救助有料化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595261?source=rss",
      "publishedAt": "2026-09-14T06:23:48.000Z",
      "xQuery": "閉山中の富士山 ヘリ救助有料化へ"
    },
    {
      "time": "15:23",
      "title": "中学生だけでの入店を拒否 違法?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595260?source=rss",
      "publishedAt": "2026-09-14T06:23:13.000Z",
      "xQuery": "中学生だけでの入店を拒否 違法?"
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
