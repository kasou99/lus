window.LUS_X_NEWS = {
  "updatedAt": "2026-07-28T06:00:31.200Z",
  "items": [
    {
      "time": "13:46",
      "title": "東海でもマンション修繕談合疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589620?source=rss",
      "publishedAt": "2026-07-28T04:46:35.000Z",
      "xQuery": "東海でもマンション修繕談合疑い"
    },
    {
      "time": "14:53",
      "title": "地方の「交通空白」どう解消する",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589617?source=rss",
      "publishedAt": "2026-07-28T05:53:08.000Z",
      "xQuery": "地方の「交通空白」どう解消する"
    },
    {
      "time": "12:28",
      "title": "老後に焦り「おひとりさま」本音",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589611?source=rss",
      "publishedAt": "2026-07-28T03:28:00.000Z",
      "xQuery": "老後に焦り「おひとりさま」本音"
    },
    {
      "time": "12:02",
      "title": "VIVANT「別班」実在せずと小泉氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589609?source=rss",
      "publishedAt": "2026-07-28T03:02:45.000Z",
      "xQuery": "VIVANT「別班」実在せずと小泉氏"
    },
    {
      "time": "12:04",
      "title": "BYDが日本で軽EV 実質100万円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589608?source=rss",
      "publishedAt": "2026-07-28T03:04:01.000Z",
      "xQuery": "BYDが日本で軽EV 実質100万円台"
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
