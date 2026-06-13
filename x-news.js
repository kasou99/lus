window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T09:39:10.050Z",
  "items": [
    {
      "time": "17:23",
      "title": "首相がG7出席のため出発 狙いは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584095?source=rss",
      "publishedAt": "2026-06-13T08:23:19.000Z",
      "xQuery": "首相がG7出席のため出発 狙いは"
    },
    {
      "time": "16:21",
      "title": "ウーバー 日本の配車で初の首位に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584087?source=rss",
      "publishedAt": "2026-06-13T07:21:12.000Z",
      "xQuery": "ウーバー 日本の配車で初の首位に"
    },
    {
      "time": "17:01",
      "title": "LUUP運転の男性死亡 事故原因は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584094?source=rss",
      "publishedAt": "2026-06-13T08:01:25.000Z",
      "xQuery": "LUUP運転の男性死亡 事故原因は"
    },
    {
      "time": "18:23",
      "title": "貨物車にはねられ死亡 飲酒運転か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584105?source=rss",
      "publishedAt": "2026-06-13T09:23:21.000Z",
      "xQuery": "貨物車にはねられ死亡 飲酒運転か"
    },
    {
      "time": "13:04",
      "title": "「レアハンバーグ」炎上 店の現在",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584071?source=rss",
      "publishedAt": "2026-06-13T04:04:35.000Z",
      "xQuery": "「レアハンバーグ」炎上 店の現在"
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
