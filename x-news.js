window.LUS_X_NEWS = {
  "updatedAt": "2026-10-10T23:39:48.984Z",
  "items": [
    {
      "time": "08:10",
      "title": "サウジ首都の空港に攻撃 12人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598321?source=rss",
      "publishedAt": "2026-10-10T23:10:14.000Z",
      "xQuery": "サウジ首都の空港に攻撃 12人死亡"
    },
    {
      "time": "08:03",
      "title": "米大統領 製油所攻撃巡りウに警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598320?source=rss",
      "publishedAt": "2026-10-10T23:03:56.000Z",
      "xQuery": "米大統領 製油所攻撃巡りウに警告"
    },
    {
      "time": "23:19",
      "title": "パレスチナ議会選 来年9月に延期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598309?source=rss",
      "publishedAt": "2026-10-10T14:19:20.000Z",
      "xQuery": "パレスチナ議会選 来年9月に延期"
    },
    {
      "time": "07:55",
      "title": "障害者50人 9カ月で雇用打ち切り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598316?source=rss",
      "publishedAt": "2026-10-10T22:55:09.000Z",
      "xQuery": "障害者50人 9カ月で雇用打ち切り"
    },
    {
      "time": "22:30",
      "title": "車と衝突 義父が用水路に落ち死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598304?source=rss",
      "publishedAt": "2026-10-10T13:30:01.000Z",
      "xQuery": "車と衝突 義父が用水路に落ち死亡"
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
