window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T00:28:42.114Z",
  "items": [
    {
      "time": "07:35",
      "title": "自衛官定員削減 安保3文書明記へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601979?source=rss",
      "publishedAt": "2026-11-09T22:35:39.000Z",
      "xQuery": "自衛官定員削減 安保3文書明記へ"
    },
    {
      "time": "07:43",
      "title": "個人向け国債人気 発行額8兆円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601981?source=rss",
      "publishedAt": "2026-11-09T22:43:16.000Z",
      "xQuery": "個人向け国債人気 発行額8兆円超"
    },
    {
      "time": "07:34",
      "title": "仏大統領選 リネール氏が出馬表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601978?source=rss",
      "publishedAt": "2026-11-09T22:34:51.000Z",
      "xQuery": "仏大統領選 リネール氏が出馬表明"
    },
    {
      "time": "08:39",
      "title": "火葬料 公営と民間で大きな差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601985?source=rss",
      "publishedAt": "2026-11-09T23:39:48.000Z",
      "xQuery": "火葬料 公営と民間で大きな差"
    },
    {
      "time": "09:20",
      "title": "グルメイベントで準備不十分 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601993?source=rss",
      "publishedAt": "2026-11-10T00:20:52.000Z",
      "xQuery": "グルメイベントで準備不十分 波紋"
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
