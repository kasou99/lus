window.LUS_X_NEWS = {
  "updatedAt": "2026-06-01T23:10:52.742Z",
  "items": [
    {
      "time": "06:33",
      "title": "台風 2～3日に九州から関東に接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582611?source=rss",
      "publishedAt": "2026-06-01T21:33:01.000Z",
      "xQuery": "台風 2～3日に九州から関東に接近"
    },
    {
      "time": "07:25",
      "title": "蓄電池売上高3倍目標 戦略改定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582615?source=rss",
      "publishedAt": "2026-06-01T22:25:01.000Z",
      "xQuery": "蓄電池売上高3倍目標 戦略改定へ"
    },
    {
      "time": "07:22",
      "title": "外国人の不動産取得 規制見送りへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582614?source=rss",
      "publishedAt": "2026-06-01T22:22:32.000Z",
      "xQuery": "外国人の不動産取得 規制見送りへ"
    },
    {
      "time": "06:21",
      "title": "Anthropic 上場に向けIPO申請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582610?source=rss",
      "publishedAt": "2026-06-01T21:21:57.000Z",
      "xQuery": "Anthropic 上場に向けIPO申請"
    },
    {
      "time": "07:36",
      "title": "秀吉の備中高松城攻め 書状確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582616?source=rss",
      "publishedAt": "2026-06-01T22:36:57.000Z",
      "xQuery": "秀吉の備中高松城攻め 書状確認"
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
