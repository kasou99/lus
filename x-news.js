window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T06:35:37.477Z",
  "items": [
    {
      "time": "14:17",
      "title": "北日本で大雨 広範囲で雷雨に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593973?source=rss",
      "publishedAt": "2026-09-02T05:17:04.000Z",
      "xQuery": "北日本で大雨 広範囲で雷雨に注意"
    },
    {
      "time": "13:55",
      "title": "論文査読にAI活用 誤情報リスクも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593969?source=rss",
      "publishedAt": "2026-09-02T04:55:56.000Z",
      "xQuery": "論文査読にAI活用 誤情報リスクも"
    },
    {
      "time": "15:12",
      "title": "殺人未遂疑いで17歳逮捕 父親死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593976?source=rss",
      "publishedAt": "2026-09-02T06:12:46.000Z",
      "xQuery": "殺人未遂疑いで17歳逮捕 父親死亡"
    },
    {
      "time": "14:22",
      "title": "三菱自 新型パジェロを世界初公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593972?source=rss",
      "publishedAt": "2026-09-02T05:22:28.000Z",
      "xQuery": "三菱自 新型パジェロを世界初公開"
    },
    {
      "time": "14:50",
      "title": "車田正美氏 46億円の横領被害訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593974?source=rss",
      "publishedAt": "2026-09-02T05:50:32.000Z",
      "xQuery": "車田正美氏 46億円の横領被害訴え"
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
