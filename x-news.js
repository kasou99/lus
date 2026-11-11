window.LUS_X_NEWS = {
  "updatedAt": "2026-11-11T12:16:48.207Z",
  "items": [
    {
      "time": "20:54",
      "title": "安保3文書改定で重視 拒否力とは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602202?source=rss",
      "publishedAt": "2026-11-11T11:54:33.000Z",
      "xQuery": "安保3文書改定で重視 拒否力とは"
    },
    {
      "time": "20:47",
      "title": "武部氏選挙運動巡り 地検に告発状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602213?source=rss",
      "publishedAt": "2026-11-11T11:47:48.000Z",
      "xQuery": "武部氏選挙運動巡り 地検に告発状"
    },
    {
      "time": "18:55",
      "title": "子の不登校で離職 防ぐ企業の制度",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602206?source=rss",
      "publishedAt": "2026-11-11T09:55:26.000Z",
      "xQuery": "子の不登校で離職 防ぐ企業の制度"
    },
    {
      "time": "20:11",
      "title": "首脳がCOP31を欠席 日本に化石賞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602204?source=rss",
      "publishedAt": "2026-11-11T11:11:29.000Z",
      "xQuery": "首脳がCOP31を欠席 日本に化石賞"
    },
    {
      "time": "17:42",
      "title": "マイケル氏 スリラー衣装が競売へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602191?source=rss",
      "publishedAt": "2026-11-11T08:42:06.000Z",
      "xQuery": "マイケル氏 スリラー衣装が競売へ"
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
