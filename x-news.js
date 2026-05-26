window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T07:27:32.586Z",
  "items": [
    {
      "time": "13:32",
      "title": "政府 南米関税同盟とEPA交渉へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581761?source=rss",
      "publishedAt": "2026-05-26T04:32:29.000Z",
      "xQuery": "政府 南米関税同盟とEPA交渉へ"
    },
    {
      "time": "13:50",
      "title": "防衛巡る中国の日本批判 対策3つ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581765?source=rss",
      "publishedAt": "2026-05-26T04:50:31.000Z",
      "xQuery": "防衛巡る中国の日本批判 対策3つ"
    },
    {
      "time": "13:53",
      "title": "エボラ出血熱巡り現地で騒乱 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581753?source=rss",
      "publishedAt": "2026-05-26T04:53:15.000Z",
      "xQuery": "エボラ出血熱巡り現地で騒乱 背景"
    },
    {
      "time": "13:31",
      "title": "工事現場でセメントかぶり2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581760?source=rss",
      "publishedAt": "2026-05-26T04:31:33.000Z",
      "xQuery": "工事現場でセメントかぶり2人死亡"
    },
    {
      "time": "14:38",
      "title": "自ら志願して中国に 日本の研究者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581769?source=rss",
      "publishedAt": "2026-05-26T05:38:26.000Z",
      "xQuery": "自ら志願して中国に 日本の研究者"
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
