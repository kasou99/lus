window.LUS_X_NEWS = {
  "updatedAt": "2026-09-07T10:39:00.334Z",
  "items": [
    {
      "time": "19:27",
      "title": "伊豆諸島に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594570?source=rss",
      "publishedAt": "2026-09-07T10:27:41.000Z",
      "xQuery": "伊豆諸島に特別警報 最新情報"
    },
    {
      "time": "12:51",
      "title": "全国の鉄道・フライト 大雨影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594503?source=rss",
      "publishedAt": "2026-09-07T03:51:31.000Z",
      "xQuery": "全国の鉄道・フライト 大雨影響"
    },
    {
      "time": "19:29",
      "title": "一律休園の対応一転 千葉市で混乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594569?source=rss",
      "publishedAt": "2026-09-07T10:29:54.000Z",
      "xQuery": "一律休園の対応一転 千葉市で混乱"
    },
    {
      "time": "18:10",
      "title": "110番通報対応のAI開発へ 警察庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594560?source=rss",
      "publishedAt": "2026-09-07T09:10:47.000Z",
      "xQuery": "110番通報対応のAI開発へ 警察庁"
    },
    {
      "time": "19:18",
      "title": "6歳男児が行方不明 山形・酒田市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594568?source=rss",
      "publishedAt": "2026-09-07T10:18:03.000Z",
      "xQuery": "6歳男児が行方不明 山形・酒田市"
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
