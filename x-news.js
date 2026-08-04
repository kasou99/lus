window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T03:10:30.764Z",
  "items": [
    {
      "time": "11:41",
      "title": "北陸・東北で梅雨明け 気象庁発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590472?source=rss",
      "publishedAt": "2026-08-04T02:41:24.000Z",
      "xQuery": "北陸・東北で梅雨明け 気象庁発表"
    },
    {
      "time": "11:43",
      "title": "イオンモール熊本前 花束や色紙",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590477?source=rss",
      "publishedAt": "2026-08-04T02:43:08.000Z",
      "xQuery": "イオンモール熊本前 花束や色紙"
    },
    {
      "time": "09:06",
      "title": "ベネズエラ地震 死者6000人超に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590458?source=rss",
      "publishedAt": "2026-08-04T00:06:55.000Z",
      "xQuery": "ベネズエラ地震 死者6000人超に"
    },
    {
      "time": "11:51",
      "title": "ANA機と国の飛行検査機 異常接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590478?source=rss",
      "publishedAt": "2026-08-04T02:51:33.000Z",
      "xQuery": "ANA機と国の飛行検査機 異常接近"
    },
    {
      "time": "11:29",
      "title": "道で意識ない状態 熱中症疑い死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590474?source=rss",
      "publishedAt": "2026-08-04T02:29:41.000Z",
      "xQuery": "道で意識ない状態 熱中症疑い死亡"
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
