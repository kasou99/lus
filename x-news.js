window.LUS_X_NEWS = {
  "updatedAt": "2026-07-30T14:18:22.633Z",
  "items": [
    {
      "time": "22:01",
      "title": "熊本地震 ボラ受け入れ態勢準備中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589953?source=rss",
      "publishedAt": "2026-07-30T13:01:28.000Z",
      "xQuery": "熊本地震 ボラ受け入れ態勢準備中"
    },
    {
      "time": "22:33",
      "title": "首相 8月3日にも熊本入りで調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589958?source=rss",
      "publishedAt": "2026-07-30T13:33:44.000Z",
      "xQuery": "首相 8月3日にも熊本入りで調整"
    },
    {
      "time": "18:12",
      "title": "8月使用分の電気・ガス 値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589926?source=rss",
      "publishedAt": "2026-07-30T09:12:24.000Z",
      "xQuery": "8月使用分の電気・ガス 値下がり"
    },
    {
      "time": "18:49",
      "title": "備蓄米買い戻し 判断時期巡る課題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589931?source=rss",
      "publishedAt": "2026-07-30T09:49:26.000Z",
      "xQuery": "備蓄米買い戻し 判断時期巡る課題"
    },
    {
      "time": "21:43",
      "title": "イオン 全従業員の安否を確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589952?source=rss",
      "publishedAt": "2026-07-30T12:43:08.000Z",
      "xQuery": "イオン 全従業員の安否を確認"
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
