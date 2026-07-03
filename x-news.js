window.LUS_X_NEWS = {
  "updatedAt": "2026-07-03T23:54:28.086Z",
  "items": [
    {
      "time": "07:17",
      "title": "九州北部 再び線状降水帯発生恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586642?source=rss",
      "publishedAt": "2026-07-03T22:17:47.000Z",
      "xQuery": "九州北部 再び線状降水帯発生恐れ"
    },
    {
      "time": "08:16",
      "title": "在留手数料減額要件厳しく 指針案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586651?source=rss",
      "publishedAt": "2026-07-03T23:16:31.000Z",
      "xQuery": "在留手数料減額要件厳しく 指針案"
    },
    {
      "time": "07:24",
      "title": "ペルー大統領選 ケイコ氏が当選",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586644?source=rss",
      "publishedAt": "2026-07-03T22:24:34.000Z",
      "xQuery": "ペルー大統領選 ケイコ氏が当選"
    },
    {
      "time": "08:03",
      "title": "米独立記念日 熱波でイベ中止続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586650?source=rss",
      "publishedAt": "2026-07-03T23:03:47.000Z",
      "xQuery": "米独立記念日 熱波でイベ中止続く"
    },
    {
      "time": "07:44",
      "title": "学校火災 教師私服干しを校長謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586647?source=rss",
      "publishedAt": "2026-07-03T22:44:22.000Z",
      "xQuery": "学校火災 教師私服干しを校長謝罪"
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
