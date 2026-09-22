window.LUS_X_NEWS = {
  "updatedAt": "2026-09-22T07:21:15.413Z",
  "items": [
    {
      "time": "14:25",
      "title": "冠水の佐倉市 帰宅できず住民落胆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596136?source=rss",
      "publishedAt": "2026-09-22T05:25:48.000Z",
      "xQuery": "冠水の佐倉市 帰宅できず住民落胆"
    },
    {
      "time": "16:10",
      "title": "土砂崩れ 高齢者施設の180人孤立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596149?source=rss",
      "publishedAt": "2026-09-22T07:10:19.000Z",
      "xQuery": "土砂崩れ 高齢者施設の180人孤立"
    },
    {
      "time": "15:13",
      "title": "3歳死亡事故「前日夜と当日飲酒」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596142?source=rss",
      "publishedAt": "2026-09-22T06:13:46.000Z",
      "xQuery": "3歳死亡事故「前日夜と当日飲酒」"
    },
    {
      "time": "15:26",
      "title": "古書店に大量注文 AI学習目的か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596144?source=rss",
      "publishedAt": "2026-09-22T06:26:15.000Z",
      "xQuery": "古書店に大量注文 AI学習目的か"
    },
    {
      "time": "15:12",
      "title": "「キューアグ」注目 なぜ衝動発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596141?source=rss",
      "publishedAt": "2026-09-22T06:12:28.000Z",
      "xQuery": "「キューアグ」注目 なぜ衝動発生"
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
