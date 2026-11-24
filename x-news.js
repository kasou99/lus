window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T05:36:10.817Z",
  "items": [
    {
      "time": "13:07",
      "title": "辺野古事故受け7割が校外活動点検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603791?source=rss",
      "publishedAt": "2026-11-24T04:07:49.000Z",
      "xQuery": "辺野古事故受け7割が校外活動点検"
    },
    {
      "time": "14:08",
      "title": "自民「宇宙庁」早期実現の提言案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603797?source=rss",
      "publishedAt": "2026-11-24T05:08:09.000Z",
      "xQuery": "自民「宇宙庁」早期実現の提言案"
    },
    {
      "time": "14:04",
      "title": "トラックに巻き込まれ 高校生死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603798?source=rss",
      "publishedAt": "2026-11-24T05:04:06.000Z",
      "xQuery": "トラックに巻き込まれ 高校生死亡"
    },
    {
      "time": "13:18",
      "title": "くら寿司22品値上げ 34品値下げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603792?source=rss",
      "publishedAt": "2026-11-24T04:18:22.000Z",
      "xQuery": "くら寿司22品値上げ 34品値下げ"
    },
    {
      "time": "11:54",
      "title": "ミスド並び方に戸惑いも 運営見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603786?source=rss",
      "publishedAt": "2026-11-24T02:54:09.000Z",
      "xQuery": "ミスド並び方に戸惑いも 運営見解"
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
