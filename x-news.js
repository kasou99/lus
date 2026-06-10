window.LUS_X_NEWS = {
  "updatedAt": "2026-06-10T10:52:07.923Z",
  "items": [
    {
      "time": "18:07",
      "title": "首相秘書 報道の音声確信持てない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583712?source=rss",
      "publishedAt": "2026-06-10T09:07:51.000Z",
      "xQuery": "首相秘書 報道の音声確信持てない"
    },
    {
      "time": "19:06",
      "title": "日銀総裁が入院 2週間程度見込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583723?source=rss",
      "publishedAt": "2026-06-10T10:06:10.000Z",
      "xQuery": "日銀総裁が入院 2週間程度見込み"
    },
    {
      "time": "18:54",
      "title": "元衆議院議長 河野洋平氏が死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583722?source=rss",
      "publishedAt": "2026-06-10T09:54:19.000Z",
      "xQuery": "元衆議院議長 河野洋平氏が死去"
    },
    {
      "time": "18:36",
      "title": "ANA 問い合わせ返信に最大2カ月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583719?source=rss",
      "publishedAt": "2026-06-10T09:36:59.000Z",
      "xQuery": "ANA 問い合わせ返信に最大2カ月"
    },
    {
      "time": "17:13",
      "title": "トヨタ会長の役員報酬 21億円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583705?source=rss",
      "publishedAt": "2026-06-10T08:13:47.000Z",
      "xQuery": "トヨタ会長の役員報酬 21億円超"
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
