window.LUS_X_NEWS = {
  "updatedAt": "2026-06-25T08:34:46.622Z",
  "items": [
    {
      "time": "16:39",
      "title": "震度6強の町 職員「怖かった」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585625?source=rss",
      "publishedAt": "2026-06-25T07:39:05.000Z",
      "xQuery": "震度6強の町 職員「怖かった」"
    },
    {
      "time": "16:44",
      "title": "小渕氏 党税調インナー辞任の意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585627?source=rss",
      "publishedAt": "2026-06-25T07:44:36.000Z",
      "xQuery": "小渕氏 党税調インナー辞任の意向"
    },
    {
      "time": "17:02",
      "title": "米企業 日産・追浜工場取得を協議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585629?source=rss",
      "publishedAt": "2026-06-25T08:02:27.000Z",
      "xQuery": "米企業 日産・追浜工場取得を協議"
    },
    {
      "time": "15:28",
      "title": "江別暴行死判決 裁判長が償い促す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585614?source=rss",
      "publishedAt": "2026-06-25T06:28:28.000Z",
      "xQuery": "江別暴行死判決 裁判長が償い促す"
    },
    {
      "time": "16:47",
      "title": "カフェで授乳ケープ使用 法的見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585622?source=rss",
      "publishedAt": "2026-06-25T07:47:05.000Z",
      "xQuery": "カフェで授乳ケープ使用 法的見解"
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
