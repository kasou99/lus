window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T13:40:22.615Z",
  "items": [
    {
      "time": "19:02",
      "title": "台風 最新情報や避難のポイント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596048?source=rss",
      "publishedAt": "2026-09-21T10:02:36.000Z",
      "xQuery": "台風 最新情報や避難のポイント"
    },
    {
      "time": "22:16",
      "title": "千葉・市原市の高滝ダム 緊急放流",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596070?source=rss",
      "publishedAt": "2026-09-21T13:16:37.000Z",
      "xQuery": "千葉・市原市の高滝ダム 緊急放流"
    },
    {
      "time": "22:09",
      "title": "神奈川3人生き埋めか 千葉1人重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596069?source=rss",
      "publishedAt": "2026-09-21T13:09:29.000Z",
      "xQuery": "神奈川3人生き埋めか 千葉1人重体"
    },
    {
      "time": "21:14",
      "title": "8月に続き「またか」千葉で嘆き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596061?source=rss",
      "publishedAt": "2026-09-21T12:14:38.000Z",
      "xQuery": "8月に続き「またか」千葉で嘆き"
    },
    {
      "time": "21:51",
      "title": "中国 軍制服組トップら2人を処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596064?source=rss",
      "publishedAt": "2026-09-21T12:51:54.000Z",
      "xQuery": "中国 軍制服組トップら2人を処分"
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
