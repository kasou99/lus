window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T06:36:05.506Z",
  "items": [
    {
      "time": "12:33",
      "title": "簗氏の「お支えチーム」本人釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598610?source=rss",
      "publishedAt": "2026-10-13T03:33:55.000Z",
      "xQuery": "簗氏の「お支えチーム」本人釈明"
    },
    {
      "time": "13:38",
      "title": "九州新幹線 新たに部品の損傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598616?source=rss",
      "publishedAt": "2026-10-13T04:38:09.000Z",
      "xQuery": "九州新幹線 新たに部品の損傷"
    },
    {
      "time": "12:03",
      "title": "オムロン 米のPCメーカー買収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598600?source=rss",
      "publishedAt": "2026-10-13T03:03:46.000Z",
      "xQuery": "オムロン 米のPCメーカー買収"
    },
    {
      "time": "14:03",
      "title": "こども園でゼリー詰まらせ4歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598617?source=rss",
      "publishedAt": "2026-10-13T05:03:24.000Z",
      "xQuery": "こども園でゼリー詰まらせ4歳死亡"
    },
    {
      "time": "15:22",
      "title": "JR東など7社 磁気乗車券を廃止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598621?source=rss",
      "publishedAt": "2026-10-13T06:22:05.000Z",
      "xQuery": "JR東など7社 磁気乗車券を廃止へ"
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
