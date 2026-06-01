window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T02:26:38.489Z",
  "items": [
    {
      "time": "10:59",
      "title": "台風6号 関東-九州へ最接近はいつ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582515?source=rss",
      "publishedAt": "2026-06-01T01:59:38.000Z",
      "xQuery": "台風6号 関東-九州へ最接近はいつ"
    },
    {
      "time": "10:22",
      "title": "日経平均 一時初の6万7000円突破",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582513?source=rss",
      "publishedAt": "2026-06-01T01:22:30.000Z",
      "xQuery": "日経平均 一時初の6万7000円突破"
    },
    {
      "time": "10:38",
      "title": "黒岩知事後援会 収支報告書にミス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582511?source=rss",
      "publishedAt": "2026-06-01T01:38:20.000Z",
      "xQuery": "黒岩知事後援会 収支報告書にミス"
    },
    {
      "time": "11:16",
      "title": "路線バスで切りつけられ軽傷 東京",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582516?source=rss",
      "publishedAt": "2026-06-01T02:16:38.000Z",
      "xQuery": "路線バスで切りつけられ軽傷 東京"
    },
    {
      "time": "09:06",
      "title": "自転車で追突 オランダ人女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582500?source=rss",
      "publishedAt": "2026-06-01T00:06:38.000Z",
      "xQuery": "自転車で追突 オランダ人女性死亡"
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
