window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T04:43:33.780Z",
  "items": [
    {
      "time": "12:36",
      "title": "中立公の3党 合流断念を確認へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593733?source=rss",
      "publishedAt": "2026-08-31T03:36:40.000Z",
      "xQuery": "中立公の3党 合流断念を確認へ"
    },
    {
      "time": "11:50",
      "title": "ハウス食品G 壱番屋の売却検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593727?source=rss",
      "publishedAt": "2026-08-31T02:50:30.000Z",
      "xQuery": "ハウス食品G 壱番屋の売却検討"
    },
    {
      "time": "11:35",
      "title": "飲食料品の値上げ 9月は4923品目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593723?source=rss",
      "publishedAt": "2026-08-31T02:35:07.000Z",
      "xQuery": "飲食料品の値上げ 9月は4923品目"
    },
    {
      "time": "10:52",
      "title": "家族旅行一転 5人死亡の遺族後悔",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593719?source=rss",
      "publishedAt": "2026-08-31T01:52:44.000Z",
      "xQuery": "家族旅行一転 5人死亡の遺族後悔"
    },
    {
      "time": "10:44",
      "title": "グランドキャニオンで大規模洪水",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593718?source=rss",
      "publishedAt": "2026-08-31T01:44:53.000Z",
      "xQuery": "グランドキャニオンで大規模洪水"
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
