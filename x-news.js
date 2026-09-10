window.LUS_X_NEWS = {
  "updatedAt": "2026-09-10T01:47:56.887Z",
  "items": [
    {
      "time": "08:43",
      "title": "内閣の外交面に高い評価 読売調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594814?source=rss",
      "publishedAt": "2026-09-09T23:43:55.000Z",
      "xQuery": "内閣の外交面に高い評価 読売調査"
    },
    {
      "time": "10:02",
      "title": "稲田氏 消費減税議論で反対した訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594821?source=rss",
      "publishedAt": "2026-09-10T01:02:37.000Z",
      "xQuery": "稲田氏 消費減税議論で反対した訳"
    },
    {
      "time": "08:08",
      "title": "沖縄知事選デマ拡散 対応追われる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594808?source=rss",
      "publishedAt": "2026-09-09T23:08:19.000Z",
      "xQuery": "沖縄知事選デマ拡散 対応追われる"
    },
    {
      "time": "09:27",
      "title": "民家で1億円超空き巣被害 匿流か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594817?source=rss",
      "publishedAt": "2026-09-10T00:27:31.000Z",
      "xQuery": "民家で1億円超空き巣被害 匿流か"
    },
    {
      "time": "10:24",
      "title": "事故で右脚失った看護師 現場復帰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594822?source=rss",
      "publishedAt": "2026-09-10T01:24:57.000Z",
      "xQuery": "事故で右脚失った看護師 現場復帰"
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
