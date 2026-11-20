window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T03:13:24.595Z",
  "items": [
    {
      "time": "11:24",
      "title": "米国頼みの高市外交 限界浮き彫り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603256?source=rss",
      "publishedAt": "2026-11-20T02:24:51.000Z",
      "xQuery": "米国頼みの高市外交 限界浮き彫り"
    },
    {
      "time": "10:12",
      "title": "日経平均 一時2800円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603248?source=rss",
      "publishedAt": "2026-11-20T01:12:04.000Z",
      "xQuery": "日経平均 一時2800円以上値下がり"
    },
    {
      "time": "11:29",
      "title": "楽天証券へ訴訟準備 1.5万人登録",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603257?source=rss",
      "publishedAt": "2026-11-20T02:29:20.000Z",
      "xQuery": "楽天証券へ訴訟準備 1.5万人登録"
    },
    {
      "time": "11:51",
      "title": "ゴミ蓄積の住宅に遺体 一部白骨化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603261?source=rss",
      "publishedAt": "2026-11-20T02:51:31.000Z",
      "xQuery": "ゴミ蓄積の住宅に遺体 一部白骨化"
    },
    {
      "time": "10:41",
      "title": "空港で靴磨き 航空会社の元社長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603252?source=rss",
      "publishedAt": "2026-11-20T01:41:41.000Z",
      "xQuery": "空港で靴磨き 航空会社の元社長"
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
