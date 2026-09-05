window.LUS_X_NEWS = {
  "updatedAt": "2026-09-05T09:16:27.678Z",
  "items": [
    {
      "time": "17:57",
      "title": "米政権に痛手 軽油価格が過去最高",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594328?source=rss",
      "publishedAt": "2026-09-05T08:57:46.000Z",
      "xQuery": "米政権に痛手 軽油価格が過去最高"
    },
    {
      "time": "17:41",
      "title": "高校生3人が沖に流される 1人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594327?source=rss",
      "publishedAt": "2026-09-05T08:41:14.000Z",
      "xQuery": "高校生3人が沖に流される 1人不明"
    },
    {
      "time": "17:32",
      "title": "母が水中に沈む7歳発見 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594326?source=rss",
      "publishedAt": "2026-09-05T08:32:24.000Z",
      "xQuery": "母が水中に沈む7歳発見 意識不明"
    },
    {
      "time": "14:55",
      "title": "妊娠中の自殺は4年間で61人 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594306?source=rss",
      "publishedAt": "2026-09-05T05:55:35.000Z",
      "xQuery": "妊娠中の自殺は4年間で61人 調査"
    },
    {
      "time": "16:24",
      "title": "水道代の値上げ相次ぐ 家計を圧迫",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594315?source=rss",
      "publishedAt": "2026-09-05T07:24:06.000Z",
      "xQuery": "水道代の値上げ相次ぐ 家計を圧迫"
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
