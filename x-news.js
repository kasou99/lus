window.LUS_X_NEWS = {
  "updatedAt": "2026-11-12T12:37:36.428Z",
  "items": [
    {
      "time": "20:50",
      "title": "拘束の記者 精力的に北方領土取材",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602339?source=rss",
      "publishedAt": "2026-11-12T11:50:54.000Z",
      "xQuery": "拘束の記者 精力的に北方領土取材"
    },
    {
      "time": "18:42",
      "title": "阿波市の副市長 市長逮捕受け謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602331?source=rss",
      "publishedAt": "2026-11-12T09:42:53.000Z",
      "xQuery": "阿波市の副市長 市長逮捕受け謝罪"
    },
    {
      "time": "19:18",
      "title": "筑波大付属小 第三者委いじめ認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602333?source=rss",
      "publishedAt": "2026-11-12T10:18:09.000Z",
      "xQuery": "筑波大付属小 第三者委いじめ認定"
    },
    {
      "time": "20:50",
      "title": "3歳児死亡 こども園は9月に傷確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602340?source=rss",
      "publishedAt": "2026-11-12T11:50:17.000Z",
      "xQuery": "3歳児死亡 こども園は9月に傷確認"
    },
    {
      "time": "21:27",
      "title": "新種ホエザル カメラにひょっこり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602342?source=rss",
      "publishedAt": "2026-11-12T12:27:59.000Z",
      "xQuery": "新種ホエザル カメラにひょっこり"
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
