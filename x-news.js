window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T02:45:15.770Z",
  "items": [
    {
      "time": "10:08",
      "title": "総務省 情報開示遅らせる旨投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593714?source=rss",
      "publishedAt": "2026-08-31T01:08:48.000Z",
      "xQuery": "総務省 情報開示遅らせる旨投稿"
    },
    {
      "time": "10:02",
      "title": "障害者雇用ビジネス 規制を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593711?source=rss",
      "publishedAt": "2026-08-31T01:02:52.000Z",
      "xQuery": "障害者雇用ビジネス 規制を検討"
    },
    {
      "time": "11:27",
      "title": "イラン 米空軍基地に報復攻撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593722?source=rss",
      "publishedAt": "2026-08-31T02:27:46.000Z",
      "xQuery": "イラン 米空軍基地に報復攻撃"
    },
    {
      "time": "10:44",
      "title": "グランドキャニオンで大規模洪水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593718?source=rss",
      "publishedAt": "2026-08-31T01:44:53.000Z",
      "xQuery": "グランドキャニオンで大規模洪水"
    },
    {
      "time": "10:52",
      "title": "家族旅行一転 5人死亡の遺族後悔",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593719?source=rss",
      "publishedAt": "2026-08-31T01:52:44.000Z",
      "xQuery": "家族旅行一転 5人死亡の遺族後悔"
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
