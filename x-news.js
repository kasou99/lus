window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T13:13:51.084Z",
  "items": [
    {
      "time": "21:52",
      "title": "電気ガス代補助 12月-来年2月実施",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600608?source=rss",
      "publishedAt": "2026-10-29T12:52:41.000Z",
      "xQuery": "電気ガス代補助 12月-来年2月実施"
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
      "time": "21:56",
      "title": "ネパール高峰で発見の2遺体は邦人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600609?source=rss",
      "publishedAt": "2026-10-29T12:56:29.000Z",
      "xQuery": "ネパール高峰で発見の2遺体は邦人"
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
