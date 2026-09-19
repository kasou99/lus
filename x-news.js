window.LUS_X_NEWS = {
  "updatedAt": "2026-09-19T23:13:46.304Z",
  "items": [
    {
      "time": "07:17",
      "title": "大型で強い台風 21日に関東最接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595856?source=rss",
      "publishedAt": "2026-09-19T22:17:16.000Z",
      "xQuery": "大型で強い台風 21日に関東最接近"
    },
    {
      "time": "07:43",
      "title": "最高裁調査官の報告書 見つかる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595860?source=rss",
      "publishedAt": "2026-09-19T22:43:23.000Z",
      "xQuery": "最高裁調査官の報告書 見つかる"
    },
    {
      "time": "07:36",
      "title": "フーシ派 サウジ首都攻撃と主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595859?source=rss",
      "publishedAt": "2026-09-19T22:36:45.000Z",
      "xQuery": "フーシ派 サウジ首都攻撃と主張"
    },
    {
      "time": "22:46",
      "title": "詐欺拠点か マレーシアで邦人拘束",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595851?source=rss",
      "publishedAt": "2026-09-19T13:46:37.000Z",
      "xQuery": "詐欺拠点か マレーシアで邦人拘束"
    },
    {
      "time": "23:00",
      "title": "生後7日で命の危機 手術受けた娘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595852?source=rss",
      "publishedAt": "2026-09-19T14:00:20.000Z",
      "xQuery": "生後7日で命の危機 手術受けた娘"
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
