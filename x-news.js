window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T15:20:42.682Z",
  "items": [
    {
      "time": "23:58",
      "title": "円安協議か 日米財務相が緊急会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585277?source=rss",
      "publishedAt": "2026-06-22T14:58:19.000Z",
      "xQuery": "円安協議か 日米財務相が緊急会談"
    },
    {
      "time": "23:04",
      "title": "イランが核査察合意と米副大統領",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585271?source=rss",
      "publishedAt": "2026-06-22T14:04:59.000Z",
      "xQuery": "イランが核査察合意と米副大統領"
    },
    {
      "time": "23:17",
      "title": "皇室典範改正の骨子了承 正副議長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585273?source=rss",
      "publishedAt": "2026-06-22T14:17:59.000Z",
      "xQuery": "皇室典範改正の骨子了承 正副議長"
    },
    {
      "time": "22:25",
      "title": "スーチー氏愛犬死ぬ 再会かなわず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585265?source=rss",
      "publishedAt": "2026-06-22T13:25:00.000Z",
      "xQuery": "スーチー氏愛犬死ぬ 再会かなわず"
    },
    {
      "time": "22:52",
      "title": "内田被告に懲役27年 遺族コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585270?source=rss",
      "publishedAt": "2026-06-22T13:52:57.000Z",
      "xQuery": "内田被告に懲役27年 遺族コメント"
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
