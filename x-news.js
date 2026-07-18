window.LUS_X_NEWS = {
  "updatedAt": "2026-07-18T23:49:34.795Z",
  "items": [
    {
      "time": "08:16",
      "title": "米イラン 覚書1カ月で有名無実化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588461?source=rss",
      "publishedAt": "2026-07-18T23:16:09.000Z",
      "xQuery": "米イラン 覚書1カ月で有名無実化"
    },
    {
      "time": "07:30",
      "title": "関東など梅雨明け秒読み 暑さ警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588456?source=rss",
      "publishedAt": "2026-07-18T22:30:15.000Z",
      "xQuery": "関東など梅雨明け秒読み 暑さ警戒"
    },
    {
      "time": "07:14",
      "title": "建物から男性転落 歩行者巻き込む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588453?source=rss",
      "publishedAt": "2026-07-18T22:14:33.000Z",
      "xQuery": "建物から男性転落 歩行者巻き込む"
    },
    {
      "time": "07:59",
      "title": "30m滑落 砂防ダム調査中に死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588459?source=rss",
      "publishedAt": "2026-07-18T22:59:19.000Z",
      "xQuery": "30m滑落 砂防ダム調査中に死亡"
    },
    {
      "time": "07:31",
      "title": "バギー転倒し中国女性が重体 沖縄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588455?source=rss",
      "publishedAt": "2026-07-18T22:31:55.000Z",
      "xQuery": "バギー転倒し中国女性が重体 沖縄"
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
