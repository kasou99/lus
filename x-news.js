window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T17:07:41.009Z",
  "items": [
    {
      "time": "21:53",
      "title": "戦地へ向かった父 1度の抱っこ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591872?source=rss",
      "publishedAt": "2026-08-15T12:53:53.000Z",
      "xQuery": "戦地へ向かった父 1度の抱っこ"
    },
    {
      "time": "23:41",
      "title": "インドネシアの地震 40人超が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591885?source=rss",
      "publishedAt": "2026-08-15T14:41:32.000Z",
      "xQuery": "インドネシアの地震 40人超が死亡"
    },
    {
      "time": "21:36",
      "title": "子と川遊びしようと 男性溺れ死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591869?source=rss",
      "publishedAt": "2026-08-15T12:36:01.000Z",
      "xQuery": "子と川遊びしようと 男性溺れ死亡"
    },
    {
      "time": "00:08",
      "title": "花火が地上付近で爆発 3人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591887?source=rss",
      "publishedAt": "2026-08-15T15:08:56.000Z",
      "xQuery": "花火が地上付近で爆発 3人けが"
    },
    {
      "time": "22:06",
      "title": "物価高 具材ない麺商品の投入加速",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591874?source=rss",
      "publishedAt": "2026-08-15T13:06:06.000Z",
      "xQuery": "物価高 具材ない麺商品の投入加速"
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
