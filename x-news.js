window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T12:41:35.882Z",
  "items": [
    {
      "time": "18:13",
      "title": "今夏大雨3件は温暖化が影響 分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600581?source=rss",
      "publishedAt": "2026-10-29T09:13:16.000Z",
      "xQuery": "今夏大雨3件は温暖化が影響 分析"
    },
    {
      "time": "19:39",
      "title": "中部電 27年3月期の特損3800億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600594?source=rss",
      "publishedAt": "2026-10-29T10:39:54.000Z",
      "xQuery": "中部電 27年3月期の特損3800億円"
    },
    {
      "time": "21:16",
      "title": "3小学校293人 給食後嘔吐など発症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600605?source=rss",
      "publishedAt": "2026-10-29T12:16:09.000Z",
      "xQuery": "3小学校293人 給食後嘔吐など発症"
    },
    {
      "time": "18:21",
      "title": "上半期世界販売 スズキが国内2位",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600585?source=rss",
      "publishedAt": "2026-10-29T09:21:24.000Z",
      "xQuery": "上半期世界販売 スズキが国内2位"
    },
    {
      "time": "20:48",
      "title": "無免許で169人に医療行為 懲役5年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600597?source=rss",
      "publishedAt": "2026-10-29T11:48:15.000Z",
      "xQuery": "無免許で169人に医療行為 懲役5年"
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
