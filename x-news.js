window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T08:16:10.626Z",
  "items": [
    {
      "time": "16:11",
      "title": "26年の熊本地震 関連死新たに5人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602047?source=rss",
      "publishedAt": "2026-11-10T07:11:30.000Z",
      "xQuery": "26年の熊本地震 関連死新たに5人"
    },
    {
      "time": "14:55",
      "title": "日本 米中露会談巡り米に懸念伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602040?source=rss",
      "publishedAt": "2026-11-10T05:55:50.000Z",
      "xQuery": "日本 米中露会談巡り米に懸念伝達"
    },
    {
      "time": "16:35",
      "title": "阿波市長逮捕 事故修理費詐取疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602049?source=rss",
      "publishedAt": "2026-11-10T07:35:03.000Z",
      "xQuery": "阿波市長逮捕 事故修理費詐取疑い"
    },
    {
      "time": "16:55",
      "title": "JR東 タッチ不要の改札導入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602052?source=rss",
      "publishedAt": "2026-11-10T07:55:46.000Z",
      "xQuery": "JR東 タッチ不要の改札導入へ"
    },
    {
      "time": "14:40",
      "title": "メタとの訴訟 前澤氏の請求を棄却",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602036?source=rss",
      "publishedAt": "2026-11-10T05:40:42.000Z",
      "xQuery": "メタとの訴訟 前澤氏の請求を棄却"
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
