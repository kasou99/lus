window.LUS_X_NEWS = {
  "updatedAt": "2026-09-26T05:39:07.380Z",
  "items": [
    {
      "time": "12:00",
      "title": "台風が沖縄へ接近 影響長期化恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596591?source=rss",
      "publishedAt": "2026-09-26T03:00:22.000Z",
      "xQuery": "台風が沖縄へ接近 影響長期化恐れ"
    },
    {
      "time": "13:48",
      "title": "長射程ミサイル 日米演習に投入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596596?source=rss",
      "publishedAt": "2026-09-26T04:48:23.000Z",
      "xQuery": "長射程ミサイル 日米演習に投入へ"
    },
    {
      "time": "11:36",
      "title": "「名代」茂木氏 首脳外交を補完",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596590?source=rss",
      "publishedAt": "2026-09-26T02:36:42.000Z",
      "xQuery": "「名代」茂木氏 首脳外交を補完"
    },
    {
      "time": "14:06",
      "title": "ふるさと納税10月規制強化 影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596604?source=rss",
      "publishedAt": "2026-09-26T05:06:55.000Z",
      "xQuery": "ふるさと納税10月規制強化 影響は"
    },
    {
      "time": "14:19",
      "title": "名古屋テレビ塔で火災 30人が避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596605?source=rss",
      "publishedAt": "2026-09-26T05:19:19.000Z",
      "xQuery": "名古屋テレビ塔で火災 30人が避難"
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
