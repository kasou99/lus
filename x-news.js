window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T07:57:47.769Z",
  "items": [
    {
      "time": "16:31",
      "title": "水位は上がる 台風通過後に危険も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582797?source=rss",
      "publishedAt": "2026-06-03T07:31:08.000Z",
      "xQuery": "水位は上がる 台風通過後に危険も"
    },
    {
      "time": "16:08",
      "title": "日経平均 終値で初の6万8000円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582791?source=rss",
      "publishedAt": "2026-06-03T07:08:10.000Z",
      "xQuery": "日経平均 終値で初の6万8000円台"
    },
    {
      "time": "13:45",
      "title": "米大統領とネタニヤフ氏 あつれき",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582773?source=rss",
      "publishedAt": "2026-06-03T04:45:37.000Z",
      "xQuery": "米大統領とネタニヤフ氏 あつれき"
    },
    {
      "time": "15:56",
      "title": "川に遺体 たつの市事件と関連捜査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582790?source=rss",
      "publishedAt": "2026-06-03T06:56:54.000Z",
      "xQuery": "川に遺体 たつの市事件と関連捜査"
    },
    {
      "time": "14:05",
      "title": "特別警報の町 浸水で「別世界」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582781?source=rss",
      "publishedAt": "2026-06-03T05:05:34.000Z",
      "xQuery": "特別警報の町 浸水で「別世界」"
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
