window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T04:13:13.479Z",
  "items": [
    {
      "time": "12:02",
      "title": "定数削減巡り国民と維新に温度差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602652?source=rss",
      "publishedAt": "2026-11-15T03:02:14.000Z",
      "xQuery": "定数削減巡り国民と維新に温度差"
    },
    {
      "time": "12:40",
      "title": "米の「中国脅威論」どう生まれた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602656?source=rss",
      "publishedAt": "2026-11-15T03:40:02.000Z",
      "xQuery": "米の「中国脅威論」どう生まれた"
    },
    {
      "time": "12:05",
      "title": "政府広報の夫婦漫才に疑問の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602653?source=rss",
      "publishedAt": "2026-11-15T03:05:14.000Z",
      "xQuery": "政府広報の夫婦漫才に疑問の声"
    },
    {
      "time": "12:56",
      "title": "住宅に強盗 少年ら5人が関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602657?source=rss",
      "publishedAt": "2026-11-15T03:56:41.000Z",
      "xQuery": "住宅に強盗 少年ら5人が関与か"
    },
    {
      "time": "09:00",
      "title": "伝説の給食みかんパン なぜ消えた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602628?source=rss",
      "publishedAt": "2026-11-15T00:00:58.000Z",
      "xQuery": "伝説の給食みかんパン なぜ消えた"
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
