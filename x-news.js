window.LUS_X_NEWS = {
  "updatedAt": "2026-08-30T04:19:43.083Z",
  "items": [
    {
      "time": "11:54",
      "title": "福井3市 大雨危険警報に引き下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593611?source=rss",
      "publishedAt": "2026-08-30T02:54:33.000Z",
      "xQuery": "福井3市 大雨危険警報に引き下げ"
    },
    {
      "time": "10:41",
      "title": "福井県大雨 車立ち往生と複数通報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593604?source=rss",
      "publishedAt": "2026-08-30T01:41:32.000Z",
      "xQuery": "福井県大雨 車立ち往生と複数通報"
    },
    {
      "time": "10:08",
      "title": "福井県で大雨 冠水など各地被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593602?source=rss",
      "publishedAt": "2026-08-30T01:08:43.000Z",
      "xQuery": "福井県で大雨 冠水など各地被害"
    },
    {
      "time": "09:56",
      "title": "中道 結党7カ月で瓦解の危機",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593599?source=rss",
      "publishedAt": "2026-08-30T00:56:02.000Z",
      "xQuery": "中道 結党7カ月で瓦解の危機"
    },
    {
      "time": "10:42",
      "title": "ネパール 衛星が捉えたせき止め湖",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593605?source=rss",
      "publishedAt": "2026-08-30T01:42:21.000Z",
      "xQuery": "ネパール 衛星が捉えたせき止め湖"
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
