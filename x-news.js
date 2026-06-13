window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T08:11:30.884Z",
  "items": [
    {
      "time": "16:43",
      "title": "内閣支持率 不安要素は中東情勢か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584091?source=rss",
      "publishedAt": "2026-06-13T07:43:18.000Z",
      "xQuery": "内閣支持率 不安要素は中東情勢か"
    },
    {
      "time": "15:32",
      "title": "米軍 ベネズエラ犯罪組織幹部殺害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584082?source=rss",
      "publishedAt": "2026-06-13T06:32:30.000Z",
      "xQuery": "米軍 ベネズエラ犯罪組織幹部殺害"
    },
    {
      "time": "16:08",
      "title": "家計株資産500兆円超 NISA後押し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584086?source=rss",
      "publishedAt": "2026-06-13T07:08:48.000Z",
      "xQuery": "家計株資産500兆円超 NISA後押し"
    },
    {
      "time": "17:01",
      "title": "LUUP運転の男性死亡 事故原因は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584094?source=rss",
      "publishedAt": "2026-06-13T08:01:25.000Z",
      "xQuery": "LUUP運転の男性死亡 事故原因は"
    },
    {
      "time": "14:22",
      "title": "異常現象 北大西洋「冷たい斑点」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584076?source=rss",
      "publishedAt": "2026-06-13T05:22:14.000Z",
      "xQuery": "異常現象 北大西洋「冷たい斑点」"
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
