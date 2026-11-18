window.LUS_X_NEWS = {
  "updatedAt": "2026-11-18T02:16:07.289Z",
  "items": [
    {
      "time": "09:37",
      "title": "APECきょう開幕 付近は厳戒態勢",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602997?source=rss",
      "publishedAt": "2026-11-18T00:37:51.000Z",
      "xQuery": "APECきょう開幕 付近は厳戒態勢"
    },
    {
      "time": "10:04",
      "title": "経済損失1.2兆円 男性更年期対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602999?source=rss",
      "publishedAt": "2026-11-18T01:04:04.000Z",
      "xQuery": "経済損失1.2兆円 男性更年期対策"
    },
    {
      "time": "10:32",
      "title": "看護師の死 突きつける命の格差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603003?source=rss",
      "publishedAt": "2026-11-18T01:32:06.000Z",
      "xQuery": "看護師の死 突きつける命の格差"
    },
    {
      "time": "10:53",
      "title": "町内会に入らずごみ出し 法的には",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603004?source=rss",
      "publishedAt": "2026-11-18T01:53:12.000Z",
      "xQuery": "町内会に入らずごみ出し 法的には"
    },
    {
      "time": "09:50",
      "title": "硫黄島 新たな陸地ドーム10個分に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602996?source=rss",
      "publishedAt": "2026-11-18T00:50:50.000Z",
      "xQuery": "硫黄島 新たな陸地ドーム10個分に"
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
