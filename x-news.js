window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T13:39:04.938Z",
  "items": [
    {
      "time": "20:42",
      "title": "中道 結党から7カ月で分裂へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593775?source=rss",
      "publishedAt": "2026-08-31T11:42:19.000Z",
      "xQuery": "中道 結党から7カ月で分裂へ"
    },
    {
      "time": "16:20",
      "title": "全教科にAIの記述 指導要領の素案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593754?source=rss",
      "publishedAt": "2026-08-31T07:20:31.000Z",
      "xQuery": "全教科にAIの記述 指導要領の素案"
    },
    {
      "time": "21:54",
      "title": "住宅ローン変動金利 2行引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593780?source=rss",
      "publishedAt": "2026-08-31T12:54:07.000Z",
      "xQuery": "住宅ローン変動金利 2行引き上げ"
    },
    {
      "time": "19:22",
      "title": "AIに機能追加で情報流出 注意点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593762?source=rss",
      "publishedAt": "2026-08-31T10:22:13.000Z",
      "xQuery": "AIに機能追加で情報流出 注意点"
    },
    {
      "time": "20:40",
      "title": "包丁キャンセル 共働き時代の料理",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593776?source=rss",
      "publishedAt": "2026-08-31T11:40:13.000Z",
      "xQuery": "包丁キャンセル 共働き時代の料理"
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
