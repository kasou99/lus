window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T08:42:10.609Z",
  "items": [
    {
      "time": "15:59",
      "title": "対露制裁見送り 米ウの亀裂深刻",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599247?source=rss",
      "publishedAt": "2026-10-18T06:59:58.000Z",
      "xQuery": "対露制裁見送り 米ウの亀裂深刻"
    },
    {
      "time": "15:37",
      "title": "高度外国人材 年収要件上げる方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599245?source=rss",
      "publishedAt": "2026-10-18T06:37:10.000Z",
      "xQuery": "高度外国人材 年収要件上げる方針"
    },
    {
      "time": "17:27",
      "title": "車と衝突 自転車の女子高校生重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599258?source=rss",
      "publishedAt": "2026-10-18T08:27:27.000Z",
      "xQuery": "車と衝突 自転車の女子高校生重体"
    },
    {
      "time": "15:57",
      "title": "40歳で若年性認知症に 前を向く今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599246?source=rss",
      "publishedAt": "2026-10-18T06:57:06.000Z",
      "xQuery": "40歳で若年性認知症に 前を向く今"
    },
    {
      "time": "17:13",
      "title": "生理前のPMDD 本人気づかぬ例も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599255?source=rss",
      "publishedAt": "2026-10-18T08:13:20.000Z",
      "xQuery": "生理前のPMDD 本人気づかぬ例も"
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
