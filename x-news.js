window.LUS_X_NEWS = {
  "updatedAt": "2026-10-17T13:13:48.903Z",
  "items": [
    {
      "time": "20:55",
      "title": "情報漏えい 識者は「氷山の一角」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599161?source=rss",
      "publishedAt": "2026-10-17T11:55:15.000Z",
      "xQuery": "情報漏えい 識者は「氷山の一角」"
    },
    {
      "time": "17:19",
      "title": "靖国に首相が真榊奉納 韓国は遺憾",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599131?source=rss",
      "publishedAt": "2026-10-17T08:19:09.000Z",
      "xQuery": "靖国に首相が真榊奉納 韓国は遺憾"
    },
    {
      "time": "21:01",
      "title": "「簗前農相の圧力」の検証 困難に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599160?source=rss",
      "publishedAt": "2026-10-17T12:01:26.000Z",
      "xQuery": "「簗前農相の圧力」の検証 困難に"
    },
    {
      "time": "20:50",
      "title": "母親を蹴り死なせた疑い 男を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599159?source=rss",
      "publishedAt": "2026-10-17T11:50:16.000Z",
      "xQuery": "母親を蹴り死なせた疑い 男を逮捕"
    },
    {
      "time": "18:42",
      "title": "ソニー生命 50人を営業活動停止に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599146?source=rss",
      "publishedAt": "2026-10-17T09:42:34.000Z",
      "xQuery": "ソニー生命 50人を営業活動停止に"
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
