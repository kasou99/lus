window.LUS_X_NEWS = {
  "updatedAt": "2026-06-16T03:50:43.446Z",
  "items": [
    {
      "time": "12:31",
      "title": "日銀1%程度に利上げ 31年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584440?source=rss",
      "publishedAt": "2026-06-16T03:31:59.000Z",
      "xQuery": "日銀1%程度に利上げ 31年ぶり水準"
    },
    {
      "time": "11:22",
      "title": "ペルシャ湾で日本関係の船舶損傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584430?source=rss",
      "publishedAt": "2026-06-16T02:22:21.000Z",
      "xQuery": "ペルシャ湾で日本関係の船舶損傷"
    },
    {
      "time": "12:19",
      "title": "アイス大手6社 値上げ幅調整疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584438?source=rss",
      "publishedAt": "2026-06-16T03:19:20.000Z",
      "xQuery": "アイス大手6社 値上げ幅調整疑い"
    },
    {
      "time": "12:23",
      "title": "ナフサ不足 どこで「目詰まり」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584435?source=rss",
      "publishedAt": "2026-06-16T03:23:48.000Z",
      "xQuery": "ナフサ不足 どこで「目詰まり」"
    },
    {
      "time": "11:26",
      "title": "角川歴彦氏が夏野社長らを提訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584431?source=rss",
      "publishedAt": "2026-06-16T02:26:23.000Z",
      "xQuery": "角川歴彦氏が夏野社長らを提訴へ"
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
