window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T12:14:29.134Z",
  "items": [
    {
      "time": "19:06",
      "title": "震度5強以上に1週間程度注意 熊本",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590529?source=rss",
      "publishedAt": "2026-08-04T10:06:12.000Z",
      "xQuery": "震度5強以上に1週間程度注意 熊本"
    },
    {
      "time": "17:46",
      "title": "消費減税で自民亀裂 選挙に影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590518?source=rss",
      "publishedAt": "2026-08-04T08:46:02.000Z",
      "xQuery": "消費減税で自民亀裂 選挙に影響は"
    },
    {
      "time": "20:42",
      "title": "ルフィ事件 幹部の懲役20年確定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590536?source=rss",
      "publishedAt": "2026-08-04T11:42:31.000Z",
      "xQuery": "ルフィ事件 幹部の懲役20年確定へ"
    },
    {
      "time": "18:49",
      "title": "小学館 社長ら26人が報酬返納",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590528?source=rss",
      "publishedAt": "2026-08-04T09:49:41.000Z",
      "xQuery": "小学館 社長ら26人が報酬返納"
    },
    {
      "time": "20:24",
      "title": "僧侶になる儀式 9歳男女48人参加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590535?source=rss",
      "publishedAt": "2026-08-04T11:24:52.000Z",
      "xQuery": "僧侶になる儀式 9歳男女48人参加"
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
