window.LUS_X_NEWS = {
  "updatedAt": "2026-09-12T05:37:25.018Z",
  "items": [
    {
      "time": "14:23",
      "title": "ランサム被害を復元 警察庁が開発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595048?source=rss",
      "publishedAt": "2026-09-12T05:23:02.000Z",
      "xQuery": "ランサム被害を復元 警察庁が開発"
    },
    {
      "time": "11:41",
      "title": "仮釈放中の性犯罪者にGPS 課題も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595032?source=rss",
      "publishedAt": "2026-09-12T02:41:22.000Z",
      "xQuery": "仮釈放中の性犯罪者にGPS 課題も"
    },
    {
      "time": "12:49",
      "title": "千葉豪雨 冠水から通行止めまで1h",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595040?source=rss",
      "publishedAt": "2026-09-12T03:49:49.000Z",
      "xQuery": "千葉豪雨 冠水から通行止めまで1h"
    },
    {
      "time": "14:06",
      "title": "韓国で「半導体高校」希望者殺到",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595045?source=rss",
      "publishedAt": "2026-09-12T05:06:40.000Z",
      "xQuery": "韓国で「半導体高校」希望者殺到"
    },
    {
      "time": "13:11",
      "title": "6歳男児不明から1週間 捜索続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595043?source=rss",
      "publishedAt": "2026-09-12T04:11:46.000Z",
      "xQuery": "6歳男児不明から1週間 捜索続く"
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
