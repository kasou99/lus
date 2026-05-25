window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T05:42:30.147Z",
  "items": [
    {
      "time": "12:36",
      "title": "森友文書 不開示巡り妻が提訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581589?source=rss",
      "publishedAt": "2026-05-25T03:36:19.000Z",
      "xQuery": "森友文書 不開示巡り妻が提訴へ"
    },
    {
      "time": "12:46",
      "title": "立ち直りへの試み 拘禁刑の最前線",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581590?source=rss",
      "publishedAt": "2026-05-25T03:46:11.000Z",
      "xQuery": "立ち直りへの試み 拘禁刑の最前線"
    },
    {
      "time": "14:30",
      "title": "銀座でスプレーか 25人が痛み訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581600?source=rss",
      "publishedAt": "2026-05-25T05:30:57.000Z",
      "xQuery": "銀座でスプレーか 25人が痛み訴え"
    },
    {
      "time": "13:15",
      "title": "住宅で男性意識不明 胸付近に出血",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581593?source=rss",
      "publishedAt": "2026-05-25T04:15:46.000Z",
      "xQuery": "住宅で男性意識不明 胸付近に出血"
    },
    {
      "time": "13:53",
      "title": "公選法違反の疑い 町長を書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581599?source=rss",
      "publishedAt": "2026-05-25T04:53:56.000Z",
      "xQuery": "公選法違反の疑い 町長を書類送検"
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
