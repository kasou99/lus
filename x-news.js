window.LUS_X_NEWS = {
  "updatedAt": "2026-09-01T08:26:28.383Z",
  "items": [
    {
      "time": "16:38",
      "title": "9月も台風シーズン 日頃の備えを",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593864?source=rss",
      "publishedAt": "2026-09-01T07:38:31.000Z",
      "xQuery": "9月も台風シーズン 日頃の備えを"
    },
    {
      "time": "15:04",
      "title": "ネパール・中国土石流 死者千人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593852?source=rss",
      "publishedAt": "2026-09-01T06:04:57.000Z",
      "xQuery": "ネパール・中国土石流 死者千人超"
    },
    {
      "time": "17:01",
      "title": "小野田氏側は否定 公選法違反疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593869?source=rss",
      "publishedAt": "2026-09-01T08:01:58.000Z",
      "xQuery": "小野田氏側は否定 公選法違反疑い"
    },
    {
      "time": "15:07",
      "title": "残業一律抑制 9/1から取りやめ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593850?source=rss",
      "publishedAt": "2026-09-01T06:07:42.000Z",
      "xQuery": "残業一律抑制 9/1から取りやめ"
    },
    {
      "time": "16:24",
      "title": "人口約300人の島 村長選に変化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593863?source=rss",
      "publishedAt": "2026-09-01T07:24:51.000Z",
      "xQuery": "人口約300人の島 村長選に変化"
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
