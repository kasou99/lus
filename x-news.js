window.LUS_X_NEWS = {
  "updatedAt": "2026-09-04T00:47:17.648Z",
  "items": [
    {
      "time": "07:21",
      "title": "四国や九州 災害危険度高まる恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594154?source=rss",
      "publishedAt": "2026-09-03T22:21:47.000Z",
      "xQuery": "四国や九州 災害危険度高まる恐れ"
    },
    {
      "time": "09:14",
      "title": "米中間選挙 共和牙城で異例の接戦",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594166?source=rss",
      "publishedAt": "2026-09-04T00:14:21.000Z",
      "xQuery": "米中間選挙 共和牙城で異例の接戦"
    },
    {
      "time": "09:24",
      "title": "闇サイト殺人 娘が伝えたウソ番号",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594164?source=rss",
      "publishedAt": "2026-09-04T00:24:59.000Z",
      "xQuery": "闇サイト殺人 娘が伝えたウソ番号"
    },
    {
      "time": "08:40",
      "title": "GPT-6発表 人間の監‌視を回避も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594163?source=rss",
      "publishedAt": "2026-09-03T23:40:44.000Z",
      "xQuery": "GPT-6発表 人間の監‌視を回避も"
    },
    {
      "time": "08:19",
      "title": "NVIDIA 米AI新興企業を買収へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594159?source=rss",
      "publishedAt": "2026-09-03T23:19:30.000Z",
      "xQuery": "NVIDIA 米AI新興企業を買収へ"
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
