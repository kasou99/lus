window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T02:27:14.438Z",
  "items": [
    {
      "time": "11:06",
      "title": "台風6号が発生 日本にも影響か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581865?source=rss",
      "publishedAt": "2026-05-27T02:06:20.000Z",
      "xQuery": "台風6号が発生 日本にも影響か"
    },
    {
      "time": "09:58",
      "title": "ロシア 国連安保理で日本を批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581857?source=rss",
      "publishedAt": "2026-05-27T00:58:32.000Z",
      "xQuery": "ロシア 国連安保理で日本を批判"
    },
    {
      "time": "10:41",
      "title": "市指定のごみ袋が品薄 怒鳴る客",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581861?source=rss",
      "publishedAt": "2026-05-27T01:41:15.000Z",
      "xQuery": "市指定のごみ袋が品薄 怒鳴る客"
    },
    {
      "time": "08:21",
      "title": "自転車の子同乗巡り 戸惑いの声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581844?source=rss",
      "publishedAt": "2026-05-26T23:21:10.000Z",
      "xQuery": "自転車の子同乗巡り 戸惑いの声"
    },
    {
      "time": "08:39",
      "title": "チェーン店のシェイク なぜ増える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581847?source=rss",
      "publishedAt": "2026-05-26T23:39:55.000Z",
      "xQuery": "チェーン店のシェイク なぜ増える"
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
