window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T08:41:43.565Z",
  "items": [
    {
      "time": "16:28",
      "title": "台風 21日昼-夜遅くに関東最接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595918?source=rss",
      "publishedAt": "2026-09-20T07:28:24.000Z",
      "xQuery": "台風 21日昼-夜遅くに関東最接近"
    },
    {
      "time": "15:17",
      "title": "ウクライナ 日本に首脳会談要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595910?source=rss",
      "publishedAt": "2026-09-20T06:17:03.000Z",
      "xQuery": "ウクライナ 日本に首脳会談要請"
    },
    {
      "time": "17:02",
      "title": "東国原氏を書類送検 名誉毀損疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595922?source=rss",
      "publishedAt": "2026-09-20T08:02:45.000Z",
      "xQuery": "東国原氏を書類送検 名誉毀損疑い"
    },
    {
      "time": "16:48",
      "title": "タクシーがバイクと衝突 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595919?source=rss",
      "publishedAt": "2026-09-20T07:48:02.000Z",
      "xQuery": "タクシーがバイクと衝突 男性死亡"
    },
    {
      "time": "14:59",
      "title": "自転車がひき逃げ 80代女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595909?source=rss",
      "publishedAt": "2026-09-20T05:59:09.000Z",
      "xQuery": "自転車がひき逃げ 80代女性死亡"
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
