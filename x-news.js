window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T10:16:53.392Z",
  "items": [
    {
      "time": "18:04",
      "title": "台風30号 非常に強い勢力で沖縄へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599718?source=rss",
      "publishedAt": "2026-10-22T09:04:33.000Z",
      "xQuery": "台風30号 非常に強い勢力で沖縄へ"
    },
    {
      "time": "16:36",
      "title": "王子コンテナーに公取委が勧告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599705?source=rss",
      "publishedAt": "2026-10-22T07:36:27.000Z",
      "xQuery": "王子コンテナーに公取委が勧告"
    },
    {
      "time": "13:27",
      "title": "米 サウジの大使館員らに退避命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599688?source=rss",
      "publishedAt": "2026-10-22T04:27:37.000Z",
      "xQuery": "米 サウジの大使館員らに退避命令"
    },
    {
      "time": "16:54",
      "title": "PHP脆弱性悪用の試み増 数百万件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599702?source=rss",
      "publishedAt": "2026-10-22T07:54:45.000Z",
      "xQuery": "PHP脆弱性悪用の試み増 数百万件"
    },
    {
      "time": "17:50",
      "title": "14歳の中学生が行方不明 大阪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599713?source=rss",
      "publishedAt": "2026-10-22T08:50:00.000Z",
      "xQuery": "14歳の中学生が行方不明 大阪"
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
