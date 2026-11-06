window.LUS_X_NEWS = {
  "updatedAt": "2026-11-06T09:35:38.731Z",
  "items": [
    {
      "time": "17:41",
      "title": "中間選挙ショック 世界で株安連鎖",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601546?source=rss",
      "publishedAt": "2026-11-06T08:41:22.000Z",
      "xQuery": "中間選挙ショック 世界で株安連鎖"
    },
    {
      "time": "17:23",
      "title": "総務省 漏えい巡りドコモ行政指導",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601543?source=rss",
      "publishedAt": "2026-11-06T08:23:34.000Z",
      "xQuery": "総務省 漏えい巡りドコモ行政指導"
    },
    {
      "time": "16:53",
      "title": "石破前首相ら減税法案の採決退席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601535?source=rss",
      "publishedAt": "2026-11-06T07:53:09.000Z",
      "xQuery": "石破前首相ら減税法案の採決退席"
    },
    {
      "time": "18:02",
      "title": "破産手続き中の全東信 社長が死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601548?source=rss",
      "publishedAt": "2026-11-06T09:02:07.000Z",
      "xQuery": "破産手続き中の全東信 社長が死去"
    },
    {
      "time": "17:17",
      "title": "無印良品のネットストア 一時停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601541?source=rss",
      "publishedAt": "2026-11-06T08:17:25.000Z",
      "xQuery": "無印良品のネットストア 一時停止"
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
