window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T01:39:11.968Z",
  "items": [
    {
      "time": "08:42",
      "title": "ウのNATO加盟で東部撤退 米打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602627?source=rss",
      "publishedAt": "2026-11-14T23:42:31.000Z",
      "xQuery": "ウのNATO加盟で東部撤退 米打診"
    },
    {
      "time": "10:02",
      "title": "米知事選 民主党が計6州を奪還",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602637?source=rss",
      "publishedAt": "2026-11-15T01:02:20.000Z",
      "xQuery": "米知事選 民主党が計6州を奪還"
    },
    {
      "time": "10:06",
      "title": "月収2万円と年金5万円 70代の現実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602636?source=rss",
      "publishedAt": "2026-11-15T01:06:17.000Z",
      "xQuery": "月収2万円と年金5万円 70代の現実"
    },
    {
      "time": "09:51",
      "title": "公務員が白塗りニンニク姿 体張る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602633?source=rss",
      "publishedAt": "2026-11-15T00:51:10.000Z",
      "xQuery": "公務員が白塗りニンニク姿 体張る"
    },
    {
      "time": "09:24",
      "title": "再開発が大赤字 大阪・阿倍野の今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602629?source=rss",
      "publishedAt": "2026-11-15T00:24:50.000Z",
      "xQuery": "再開発が大赤字 大阪・阿倍野の今"
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
