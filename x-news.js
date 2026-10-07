window.LUS_X_NEWS = {
  "updatedAt": "2026-10-07T23:40:11.495Z",
  "items": [
    {
      "time": "08:03",
      "title": "外国人材 都市部への転職が増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597945?source=rss",
      "publishedAt": "2026-10-07T23:03:09.000Z",
      "xQuery": "外国人材 都市部への転職が増加"
    },
    {
      "time": "06:30",
      "title": "硤合氏発見 不斉自己触媒作用とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597938?source=rss",
      "publishedAt": "2026-10-07T21:30:20.000Z",
      "xQuery": "硤合氏発見 不斉自己触媒作用とは"
    },
    {
      "time": "07:40",
      "title": "TOPIX構成銘柄 1634→986社へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597944?source=rss",
      "publishedAt": "2026-10-07T22:40:31.000Z",
      "xQuery": "TOPIX構成銘柄 1634→986社へ"
    },
    {
      "time": "23:33",
      "title": "サンケイビル売却 入札額1兆円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597933?source=rss",
      "publishedAt": "2026-10-07T14:33:48.000Z",
      "xQuery": "サンケイビル売却 入札額1兆円超"
    },
    {
      "time": "22:23",
      "title": "愛知・大村知事の発言 タイで波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597927?source=rss",
      "publishedAt": "2026-10-07T13:23:29.000Z",
      "xQuery": "愛知・大村知事の発言 タイで波紋"
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
