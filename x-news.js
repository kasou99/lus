window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T08:18:48.628Z",
  "items": [
    {
      "time": "16:12",
      "title": "ニチレイの障害 物流復旧へ正念場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588516?source=rss",
      "publishedAt": "2026-07-19T07:12:22.000Z",
      "xQuery": "ニチレイの障害 物流復旧へ正念場"
    },
    {
      "time": "15:56",
      "title": "サッカー場で倒木 幼児ら7人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588514?source=rss",
      "publishedAt": "2026-07-19T06:56:15.000Z",
      "xQuery": "サッカー場で倒木 幼児ら7人搬送"
    },
    {
      "time": "15:49",
      "title": "親子切られ重軽傷 逃走の少年死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588512?source=rss",
      "publishedAt": "2026-07-19T06:49:50.000Z",
      "xQuery": "親子切られ重軽傷 逃走の少年死亡"
    },
    {
      "time": "17:11",
      "title": "SUP中に海転落の大学生死亡 横浜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588524?source=rss",
      "publishedAt": "2026-07-19T08:11:16.000Z",
      "xQuery": "SUP中に海転落の大学生死亡 横浜"
    },
    {
      "time": "17:06",
      "title": "米スペースX城下町 反発の動きも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588526?source=rss",
      "publishedAt": "2026-07-19T08:06:42.000Z",
      "xQuery": "米スペースX城下町 反発の動きも"
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
