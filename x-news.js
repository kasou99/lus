window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T09:45:20.238Z",
  "items": [
    {
      "time": "16:53",
      "title": "拉致巡り首相 私の代で突破口を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582312?source=rss",
      "publishedAt": "2026-05-30T07:53:35.000Z",
      "xQuery": "拉致巡り首相 私の代で突破口を"
    },
    {
      "time": "16:38",
      "title": "iPS論文数 米国や中国との差拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582310?source=rss",
      "publishedAt": "2026-05-30T07:38:46.000Z",
      "xQuery": "iPS論文数 米国や中国との差拡大"
    },
    {
      "time": "18:09",
      "title": "JAL機パンクの滑走路 破損判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582321?source=rss",
      "publishedAt": "2026-05-30T09:09:34.000Z",
      "xQuery": "JAL機パンクの滑走路 破損判明"
    },
    {
      "time": "17:20",
      "title": "強殺 手配の男元タクシー運転手か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582316?source=rss",
      "publishedAt": "2026-05-30T08:20:35.000Z",
      "xQuery": "強殺 手配の男元タクシー運転手か"
    },
    {
      "time": "17:53",
      "title": "停めた車後退か 下敷きになり死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582319?source=rss",
      "publishedAt": "2026-05-30T08:53:26.000Z",
      "xQuery": "停めた車後退か 下敷きになり死亡"
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
