window.LUS_X_NEWS = {
  "updatedAt": "2026-09-29T02:26:56.241Z",
  "items": [
    {
      "time": "10:51",
      "title": "台風26号 30日から伊豆諸島接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596929?source=rss",
      "publishedAt": "2026-09-29T01:51:00.000Z",
      "xQuery": "台風26号 30日から伊豆諸島接近へ"
    },
    {
      "time": "09:04",
      "title": "イラン 間接協議で米側へ要求伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596919?source=rss",
      "publishedAt": "2026-09-29T00:04:07.000Z",
      "xQuery": "イラン 間接協議で米側へ要求伝達"
    },
    {
      "time": "11:17",
      "title": "内田受刑者の公判に乱入 有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596932?source=rss",
      "publishedAt": "2026-09-29T02:17:06.000Z",
      "xQuery": "内田受刑者の公判に乱入 有罪判決"
    },
    {
      "time": "10:33",
      "title": "匿流に住宅情報流した疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596927?source=rss",
      "publishedAt": "2026-09-29T01:33:21.000Z",
      "xQuery": "匿流に住宅情報流した疑い 男逮捕"
    },
    {
      "time": "08:27",
      "title": "タイムズカー情報漏えい 識者警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596915?source=rss",
      "publishedAt": "2026-09-28T23:27:13.000Z",
      "xQuery": "タイムズカー情報漏えい 識者警鐘"
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
