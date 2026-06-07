window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T05:41:04.836Z",
  "items": [
    {
      "time": "13:51",
      "title": "政府 ガソリン補助の「出口」探る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583292?source=rss",
      "publishedAt": "2026-06-07T04:51:11.000Z",
      "xQuery": "政府 ガソリン補助の「出口」探る"
    },
    {
      "time": "10:30",
      "title": "書店1万店割れ ピーク時の4割余り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583271?source=rss",
      "publishedAt": "2026-06-07T01:30:42.000Z",
      "xQuery": "書店1万店割れ ピーク時の4割余り"
    },
    {
      "time": "11:59",
      "title": "京都で不明の米学生 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583281?source=rss",
      "publishedAt": "2026-06-07T02:59:07.000Z",
      "xQuery": "京都で不明の米学生 遺体で発見"
    },
    {
      "time": "12:50",
      "title": "内申書が子の主体性奪う? 懸念は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583284?source=rss",
      "publishedAt": "2026-06-07T03:50:41.000Z",
      "xQuery": "内申書が子の主体性奪う? 懸念は"
    },
    {
      "time": "13:34",
      "title": "円満演じる「仮面夫婦」 子に影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583289?source=rss",
      "publishedAt": "2026-06-07T04:34:37.000Z",
      "xQuery": "円満演じる「仮面夫婦」 子に影響"
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
