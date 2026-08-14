window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T10:25:23.185Z",
  "items": [
    {
      "time": "16:35",
      "title": "関東 局地的に非常に激しい雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591705?source=rss",
      "publishedAt": "2026-08-14T07:35:06.000Z",
      "xQuery": "関東 局地的に非常に激しい雨恐れ"
    },
    {
      "time": "18:14",
      "title": "千葉豪雨少なくとも放置車両200台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591720?source=rss",
      "publishedAt": "2026-08-14T09:14:14.000Z",
      "xQuery": "千葉豪雨少なくとも放置車両200台"
    },
    {
      "time": "17:34",
      "title": "声届かず沈む車 住民が窓割り救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591716?source=rss",
      "publishedAt": "2026-08-14T08:34:08.000Z",
      "xQuery": "声届かず沈む車 住民が窓割り救助"
    },
    {
      "time": "18:53",
      "title": "戦犯として裁かれた父 罪感じる娘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591726?source=rss",
      "publishedAt": "2026-08-14T09:53:33.000Z",
      "xQuery": "戦犯として裁かれた父 罪感じる娘"
    },
    {
      "time": "17:27",
      "title": "英国籍の中学生 日本旅行中に不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591713?source=rss",
      "publishedAt": "2026-08-14T08:27:30.000Z",
      "xQuery": "英国籍の中学生 日本旅行中に不明"
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
