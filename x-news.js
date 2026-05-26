window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T13:16:00.887Z",
  "items": [
    {
      "time": "20:17",
      "title": "給付付き税額控除 イメージ案判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581808?source=rss",
      "publishedAt": "2026-05-26T11:17:42.000Z",
      "xQuery": "給付付き税額控除 イメージ案判明"
    },
    {
      "time": "18:56",
      "title": "議員ボーナス据え置き 衆院で可決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581800?source=rss",
      "publishedAt": "2026-05-26T09:56:56.000Z",
      "xQuery": "議員ボーナス据え置き 衆院で可決"
    },
    {
      "time": "20:45",
      "title": "JAL「月への宅配便」開始へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581811?source=rss",
      "publishedAt": "2026-05-26T11:45:57.000Z",
      "xQuery": "JAL「月への宅配便」開始へ"
    },
    {
      "time": "20:59",
      "title": "フェラーリ株価が急落 欧州市場",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581813?source=rss",
      "publishedAt": "2026-05-26T11:59:32.000Z",
      "xQuery": "フェラーリ株価が急落 欧州市場"
    },
    {
      "time": "20:14",
      "title": "阿部前監督巡る児相対応 識者見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581805?source=rss",
      "publishedAt": "2026-05-26T11:14:06.000Z",
      "xQuery": "阿部前監督巡る児相対応 識者見解"
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
