window.LUS_X_NEWS = {
  "updatedAt": "2026-07-16T18:31:39.726Z",
  "items": [
    {
      "time": "22:17",
      "title": "熱中症で127人救急搬送 東京",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588190?source=rss",
      "publishedAt": "2026-07-16T13:17:04.000Z",
      "xQuery": "熱中症で127人救急搬送 東京"
    },
    {
      "time": "23:31",
      "title": "ウクライナ 国防相更迭に市民怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588201?source=rss",
      "publishedAt": "2026-07-16T14:31:43.000Z",
      "xQuery": "ウクライナ 国防相更迭に市民怒り"
    },
    {
      "time": "22:08",
      "title": "アエラホーム 民事再生法を申請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588189?source=rss",
      "publishedAt": "2026-07-16T13:08:07.000Z",
      "xQuery": "アエラホーム 民事再生法を申請"
    },
    {
      "time": "18:13",
      "title": "サイゼ株ストップ高 社長発言受け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588171?source=rss",
      "publishedAt": "2026-07-16T09:13:43.000Z",
      "xQuery": "サイゼ株ストップ高 社長発言受け"
    },
    {
      "time": "21:16",
      "title": "ダイハツ 軽トラ約29万台リコール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588185?source=rss",
      "publishedAt": "2026-07-16T12:16:01.000Z",
      "xQuery": "ダイハツ 軽トラ約29万台リコール"
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
