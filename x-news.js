window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T11:02:37.353Z",
  "items": [
    {
      "time": "18:14",
      "title": "被災の老人ホーム 熱中症疑い続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590284?source=rss",
      "publishedAt": "2026-08-02T09:14:37.000Z",
      "xQuery": "被災の老人ホーム 熱中症疑い続出"
    },
    {
      "time": "19:12",
      "title": "非常に強い台風 小笠原諸島接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590290?source=rss",
      "publishedAt": "2026-08-02T10:12:43.000Z",
      "xQuery": "非常に強い台風 小笠原諸島接近へ"
    },
    {
      "time": "19:43",
      "title": "イオンモール宇城 下敷きの客死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590296?source=rss",
      "publishedAt": "2026-08-02T10:43:38.000Z",
      "xQuery": "イオンモール宇城 下敷きの客死亡"
    },
    {
      "time": "19:24",
      "title": "イオン爆発 妻のスマホが形見に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590295?source=rss",
      "publishedAt": "2026-08-02T10:24:42.000Z",
      "xQuery": "イオン爆発 妻のスマホが形見に"
    },
    {
      "time": "19:07",
      "title": "中継 長岡まつり大花火大会",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590289?source=rss",
      "publishedAt": "2026-08-02T10:07:01.000Z",
      "xQuery": "中継 長岡まつり大花火大会"
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
