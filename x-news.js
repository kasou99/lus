window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T07:35:56.265Z",
  "items": [
    {
      "time": "15:38",
      "title": "政府初の防災「国家戦略」案判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603804?source=rss",
      "publishedAt": "2026-11-24T06:38:58.000Z",
      "xQuery": "政府初の防災「国家戦略」案判明"
    },
    {
      "time": "14:52",
      "title": "東電 廃炉・復興で新組織設立へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603802?source=rss",
      "publishedAt": "2026-11-24T05:52:46.000Z",
      "xQuery": "東電 廃炉・復興で新組織設立へ"
    },
    {
      "time": "14:34",
      "title": "交通誘導中にはねられる 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603801?source=rss",
      "publishedAt": "2026-11-24T05:34:44.000Z",
      "xQuery": "交通誘導中にはねられる 男性死亡"
    },
    {
      "time": "12:34",
      "title": "NVIDIAフアンCEO復帰 3つの懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603782?source=rss",
      "publishedAt": "2026-11-24T03:34:48.000Z",
      "xQuery": "NVIDIAフアンCEO復帰 3つの懸念"
    },
    {
      "time": "15:57",
      "title": "ヴェレダ クレカ4万件超漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603807?source=rss",
      "publishedAt": "2026-11-24T06:57:01.000Z",
      "xQuery": "ヴェレダ クレカ4万件超漏えいか"
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
