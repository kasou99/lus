window.LUS_X_NEWS = {
  "updatedAt": "2026-08-11T22:48:03.413Z",
  "items": [
    {
      "time": "06:07",
      "title": "台風15号は近畿地方から西へ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591375?source=rss",
      "publishedAt": "2026-08-11T21:07:09.000Z",
      "xQuery": "台風15号は近畿地方から西へ 警戒"
    },
    {
      "time": "06:48",
      "title": "元・経団連会長 奥田碩さん死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591379?source=rss",
      "publishedAt": "2026-08-11T21:48:14.000Z",
      "xQuery": "元・経団連会長 奥田碩さん死去"
    },
    {
      "time": "22:38",
      "title": "イオン 爆発事故で遺族に補償方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591365?source=rss",
      "publishedAt": "2026-08-11T13:38:51.000Z",
      "xQuery": "イオン 爆発事故で遺族に補償方針"
    },
    {
      "time": "07:30",
      "title": "美容医療の低年齢化 親の意向も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591382?source=rss",
      "publishedAt": "2026-08-11T22:30:27.000Z",
      "xQuery": "美容医療の低年齢化 親の意向も"
    },
    {
      "time": "20:59",
      "title": "YouTube 収益化ハードル引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591352?source=rss",
      "publishedAt": "2026-08-11T11:59:38.000Z",
      "xQuery": "YouTube 収益化ハードル引き上げ"
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
