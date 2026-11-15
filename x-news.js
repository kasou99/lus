window.LUS_X_NEWS = {
  "updatedAt": "2026-11-15T21:35:05.533Z",
  "items": [
    {
      "time": "00:37",
      "title": "福岡市長選 再選挙の見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602736?source=rss",
      "publishedAt": "2026-11-15T15:37:18.000Z",
      "xQuery": "福岡市長選 再選挙の見通し"
    },
    {
      "time": "23:36",
      "title": "原潜の保有「反対」52% 読売調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602735?source=rss",
      "publishedAt": "2026-11-15T14:36:13.000Z",
      "xQuery": "原潜の保有「反対」52% 読売調査"
    },
    {
      "time": "06:14",
      "title": "特急と衝突し車火災 遺体を発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602737?source=rss",
      "publishedAt": "2026-11-15T21:14:12.000Z",
      "xQuery": "特急と衝突し車火災 遺体を発見"
    },
    {
      "time": "22:02",
      "title": "NVIDIAフアン氏復帰を 署名広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602724?source=rss",
      "publishedAt": "2026-11-15T13:02:58.000Z",
      "xQuery": "NVIDIAフアン氏復帰を 署名広がる"
    },
    {
      "time": "22:56",
      "title": "走行中の車から転落 女性が重傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602732?source=rss",
      "publishedAt": "2026-11-15T13:56:05.000Z",
      "xQuery": "走行中の車から転落 女性が重傷"
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
