window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T01:39:29.482Z",
  "items": [
    {
      "time": "09:32",
      "title": "米大統領 海峡「通航料」20%要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587857?source=rss",
      "publishedAt": "2026-07-14T00:32:39.000Z",
      "xQuery": "米大統領 海峡「通航料」20%要求"
    },
    {
      "time": "09:03",
      "title": "愛媛県の内部通報20年間ゼロ 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587855?source=rss",
      "publishedAt": "2026-07-14T00:03:10.000Z",
      "xQuery": "愛媛県の内部通報20年間ゼロ 調査"
    },
    {
      "time": "09:04",
      "title": "冷凍庫遺体 元妻「離婚届作った」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587856?source=rss",
      "publishedAt": "2026-07-14T00:04:32.000Z",
      "xQuery": "冷凍庫遺体 元妻「離婚届作った」"
    },
    {
      "time": "08:08",
      "title": "休職代行広がり 公務員ら駆け込み",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587847?source=rss",
      "publishedAt": "2026-07-13T23:08:01.000Z",
      "xQuery": "休職代行広がり 公務員ら駆け込み"
    },
    {
      "time": "09:51",
      "title": "クレカ作れない 借金150万円男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587858?source=rss",
      "publishedAt": "2026-07-14T00:51:53.000Z",
      "xQuery": "クレカ作れない 借金150万円男性"
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
