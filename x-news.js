window.LUS_X_NEWS = {
  "updatedAt": "2026-08-15T05:41:21.346Z",
  "items": [
    {
      "time": "12:48",
      "title": "首相「反省」触れず 戦没者追悼式",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591801?source=rss",
      "publishedAt": "2026-08-15T03:48:38.000Z",
      "xQuery": "首相「反省」触れず 戦没者追悼式"
    },
    {
      "time": "14:19",
      "title": "閣僚の靖国参拝 中国が強烈な抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591814?source=rss",
      "publishedAt": "2026-08-15T05:19:59.000Z",
      "xQuery": "閣僚の靖国参拝 中国が強烈な抗議"
    },
    {
      "time": "14:15",
      "title": "インドネシア地震 5人死亡と発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591813?source=rss",
      "publishedAt": "2026-08-15T05:15:33.000Z",
      "xQuery": "インドネシア地震 5人死亡と発表"
    },
    {
      "time": "14:06",
      "title": "車水没 保険適用のためすべきこと",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591810?source=rss",
      "publishedAt": "2026-08-15T05:06:44.000Z",
      "xQuery": "車水没 保険適用のためすべきこと"
    },
    {
      "time": "12:50",
      "title": "壁から大量の金貨や金塊 ベルギー",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591802?source=rss",
      "publishedAt": "2026-08-15T03:50:55.000Z",
      "xQuery": "壁から大量の金貨や金塊 ベルギー"
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
