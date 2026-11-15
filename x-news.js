window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T01:11:26.861Z",
  "items": [
    {
      "time": "08:41",
      "title": "米中露会談 3首脳の思惑が交錯",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602626?source=rss",
      "publishedAt": "2026-11-14T23:41:26.000Z",
      "xQuery": "米中露会談 3首脳の思惑が交錯"
    },
    {
      "time": "08:42",
      "title": "ウのNATO加盟で東部撤退 米打診",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602627?source=rss",
      "publishedAt": "2026-11-14T23:42:31.000Z",
      "xQuery": "ウのNATO加盟で東部撤退 米打診"
    },
    {
      "time": "08:40",
      "title": "住宅強盗 寝ていた82歳女性が重傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602623?source=rss",
      "publishedAt": "2026-11-14T23:40:52.000Z",
      "xQuery": "住宅強盗 寝ていた82歳女性が重傷"
    },
    {
      "time": "07:18",
      "title": "ラヴ上等「あっすん」容疑者逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602608?source=rss",
      "publishedAt": "2026-11-14T22:18:13.000Z",
      "xQuery": "ラヴ上等「あっすん」容疑者逮捕"
    },
    {
      "time": "09:51",
      "title": "公務員が白塗りニンニク姿 体張る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602633?source=rss",
      "publishedAt": "2026-11-15T00:51:10.000Z",
      "xQuery": "公務員が白塗りニンニク姿 体張る"
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
