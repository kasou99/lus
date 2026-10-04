window.LUS_X_NEWS = {
  "updatedAt": "2026-10-04T12:56:20.415Z",
  "items": [
    {
      "time": "18:43",
      "title": "台風27号 太平洋側は高波に警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597534?source=rss",
      "publishedAt": "2026-10-04T09:43:18.000Z",
      "xQuery": "台風27号 太平洋側は高波に警戒を"
    },
    {
      "time": "20:28",
      "title": "那覇強殺事件 遺族がコメント発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597545?source=rss",
      "publishedAt": "2026-10-04T11:28:09.000Z",
      "xQuery": "那覇強殺事件 遺族がコメント発表"
    },
    {
      "time": "21:34",
      "title": "露元首相 プーチン氏の過ち語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597552?source=rss",
      "publishedAt": "2026-10-04T12:34:33.000Z",
      "xQuery": "露元首相 プーチン氏の過ち語る"
    },
    {
      "time": "19:20",
      "title": "故意に車を対向車に衝突疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597540?source=rss",
      "publishedAt": "2026-10-04T10:20:58.000Z",
      "xQuery": "故意に車を対向車に衝突疑い 逮捕"
    },
    {
      "time": "20:33",
      "title": "ごみ収集車で頭巻き込まれる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597547?source=rss",
      "publishedAt": "2026-10-04T11:33:46.000Z",
      "xQuery": "ごみ収集車で頭巻き込まれる 死亡"
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
