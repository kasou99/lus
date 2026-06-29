window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T22:55:45.083Z",
  "items": [
    {
      "time": "07:42",
      "title": "ベネズエラ 地震の死者1700人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586181?source=rss",
      "publishedAt": "2026-06-29T22:42:54.000Z",
      "xQuery": "ベネズエラ 地震の死者1700人超"
    },
    {
      "time": "06:21",
      "title": "NYダウ 終値で初の5万2000ドル台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586175?source=rss",
      "publishedAt": "2026-06-29T21:21:03.000Z",
      "xQuery": "NYダウ 終値で初の5万2000ドル台"
    },
    {
      "time": "06:36",
      "title": "JAL補助金不正受給 2億円返還へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586176?source=rss",
      "publishedAt": "2026-06-29T21:36:39.000Z",
      "xQuery": "JAL補助金不正受給 2億円返還へ"
    },
    {
      "time": "22:12",
      "title": "なぜうちが 中国禁輸拡大に戸惑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586152?source=rss",
      "publishedAt": "2026-06-29T13:12:10.000Z",
      "xQuery": "なぜうちが 中国禁輸拡大に戸惑い"
    },
    {
      "time": "22:59",
      "title": "客が乗務員室で機器触る 近鉄釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586157?source=rss",
      "publishedAt": "2026-06-29T13:59:51.000Z",
      "xQuery": "客が乗務員室で機器触る 近鉄釈明"
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
