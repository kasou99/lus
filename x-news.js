window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T03:43:27.720Z",
  "items": [
    {
      "time": "11:34",
      "title": "台風24号発生 週後半は大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593833?source=rss",
      "publishedAt": "2026-09-01T02:34:13.000Z",
      "xQuery": "台風24号発生 週後半は大雨の恐れ"
    },
    {
      "time": "11:12",
      "title": "備蓄米21万t 今月買い戻し実施へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593829?source=rss",
      "publishedAt": "2026-09-01T02:12:38.000Z",
      "xQuery": "備蓄米21万t 今月買い戻し実施へ"
    },
    {
      "time": "07:47",
      "title": "やさしい日本語 熊本地震でも活用",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593802?source=rss",
      "publishedAt": "2026-08-31T22:47:26.000Z",
      "xQuery": "やさしい日本語 熊本地震でも活用"
    },
    {
      "time": "12:11",
      "title": "秋山豊寛さん死去 90年に宇宙飛行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593838?source=rss",
      "publishedAt": "2026-09-01T03:11:41.000Z",
      "xQuery": "秋山豊寛さん死去 90年に宇宙飛行"
    },
    {
      "time": "09:54",
      "title": "高校で車横転 生徒の遺族が提訴へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593821?source=rss",
      "publishedAt": "2026-09-01T00:54:26.000Z",
      "xQuery": "高校で車横転 生徒の遺族が提訴へ"
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
