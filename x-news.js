window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T09:46:05.974Z",
  "items": [
    {
      "time": "18:06",
      "title": "アサヒGHD社長 カルテル認識ない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598028?source=rss",
      "publishedAt": "2026-10-08T09:06:35.000Z",
      "xQuery": "アサヒGHD社長 カルテル認識ない"
    },
    {
      "time": "17:10",
      "title": "プルデンシャル不正 約52億円被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598015?source=rss",
      "publishedAt": "2026-10-08T08:10:42.000Z",
      "xQuery": "プルデンシャル不正 約52億円被害"
    },
    {
      "time": "17:20",
      "title": "首相 簗氏に「働いて仕事で返せ」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598019?source=rss",
      "publishedAt": "2026-10-08T08:20:19.000Z",
      "xQuery": "首相 簗氏に「働いて仕事で返せ」"
    },
    {
      "time": "16:31",
      "title": "ファストリ 過去最高業績を更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598005?source=rss",
      "publishedAt": "2026-10-08T07:31:36.000Z",
      "xQuery": "ファストリ 過去最高業績を更新"
    },
    {
      "time": "16:19",
      "title": "スーパーカップ抹茶 製造終了の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598001?source=rss",
      "publishedAt": "2026-10-08T07:19:52.000Z",
      "xQuery": "スーパーカップ抹茶 製造終了の訳"
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
