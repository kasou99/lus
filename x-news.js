window.LUS_X_NEWS = {
  "updatedAt": "2026-07-12T20:21:19.875Z",
  "items": [
    {
      "time": "22:49",
      "title": "戦う政治家発言も 国会運営実態は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587722?source=rss",
      "publishedAt": "2026-07-12T13:49:50.000Z",
      "xQuery": "戦う政治家発言も 国会運営実態は"
    },
    {
      "time": "22:13",
      "title": "ウクライナ 内閣改造で首相交代へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587720?source=rss",
      "publishedAt": "2026-07-12T13:13:59.000Z",
      "xQuery": "ウクライナ 内閣改造で首相交代へ"
    },
    {
      "time": "21:36",
      "title": "生食用鶏肉 ガイドライン初策定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587717?source=rss",
      "publishedAt": "2026-07-12T12:36:20.000Z",
      "xQuery": "生食用鶏肉 ガイドライン初策定へ"
    },
    {
      "time": "21:28",
      "title": "マットで中1死亡 賠償応じない3人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587716?source=rss",
      "publishedAt": "2026-07-12T12:28:46.000Z",
      "xQuery": "マットで中1死亡 賠償応じない3人"
    },
    {
      "time": "23:18",
      "title": "セクハラ辞任の前市長落選 田川市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587726?source=rss",
      "publishedAt": "2026-07-12T14:18:45.000Z",
      "xQuery": "セクハラ辞任の前市長落選 田川市"
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
