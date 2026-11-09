window.LUS_X_NEWS = {
  "updatedAt": "2026-11-09T07:13:47.777Z",
  "items": [
    {
      "time": "13:58",
      "title": "26年の熊本地震 初の災害関連死",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601907?source=rss",
      "publishedAt": "2026-11-09T04:58:11.000Z",
      "xQuery": "26年の熊本地震 初の災害関連死"
    },
    {
      "time": "14:00",
      "title": "アフリカ カルト教団が増える背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601895?source=rss",
      "publishedAt": "2026-11-09T05:00:45.000Z",
      "xQuery": "アフリカ カルト教団が増える背景"
    },
    {
      "time": "13:48",
      "title": "採決直前に退席 石破氏が理由説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601906?source=rss",
      "publishedAt": "2026-11-09T04:48:18.000Z",
      "xQuery": "採決直前に退席 石破氏が理由説明"
    },
    {
      "time": "13:25",
      "title": "黒字リストラ 中高年が残る条件は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601894?source=rss",
      "publishedAt": "2026-11-09T04:25:34.000Z",
      "xQuery": "黒字リストラ 中高年が残る条件は"
    },
    {
      "time": "15:08",
      "title": "珍しい現象 二重の水上竜巻が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601913?source=rss",
      "publishedAt": "2026-11-09T06:08:20.000Z",
      "xQuery": "珍しい現象 二重の水上竜巻が発生"
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
