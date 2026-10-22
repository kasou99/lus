window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T06:58:13.172Z",
  "items": [
    {
      "time": "13:56",
      "title": "高市氏 自民内から再選支持相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599693?source=rss",
      "publishedAt": "2026-10-22T04:56:22.000Z",
      "xQuery": "高市氏 自民内から再選支持相次ぐ"
    },
    {
      "time": "12:24",
      "title": "PHP問題 政府機関の被害報告なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599683?source=rss",
      "publishedAt": "2026-10-22T03:24:45.000Z",
      "xQuery": "PHP問題 政府機関の被害報告なし"
    },
    {
      "time": "14:21",
      "title": "マンジャロを不正販売の疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599691?source=rss",
      "publishedAt": "2026-10-22T05:21:49.000Z",
      "xQuery": "マンジャロを不正販売の疑い 逮捕"
    },
    {
      "time": "13:00",
      "title": "しんじょう君巡る裁判 市が上告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599685?source=rss",
      "publishedAt": "2026-10-22T04:00:11.000Z",
      "xQuery": "しんじょう君巡る裁判 市が上告"
    },
    {
      "time": "15:24",
      "title": "70cmのジュラ紀恐竜足跡 化石発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599697?source=rss",
      "publishedAt": "2026-10-22T06:24:24.000Z",
      "xQuery": "70cmのジュラ紀恐竜足跡 化石発見"
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
