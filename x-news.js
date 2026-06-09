window.LUS_X_NEWS = {
  "updatedAt": "2026-06-09T23:02:24.758Z",
  "items": [
    {
      "time": "07:13",
      "title": "米軍 ヘリ撃墜でイランに報復開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583620?source=rss",
      "publishedAt": "2026-06-09T22:13:47.000Z",
      "xQuery": "米軍 ヘリ撃墜でイランに報復開始"
    },
    {
      "time": "06:51",
      "title": "宇都宮出没のクマ 複数頭の可能性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583619?source=rss",
      "publishedAt": "2026-06-09T21:51:38.000Z",
      "xQuery": "宇都宮出没のクマ 複数頭の可能性"
    },
    {
      "time": "07:40",
      "title": "成田の滑走路巡り 土地収用申請へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583626?source=rss",
      "publishedAt": "2026-06-09T22:40:33.000Z",
      "xQuery": "成田の滑走路巡り 土地収用申請へ"
    },
    {
      "time": "07:28",
      "title": "AIに相談し恐喝疑い 少女ら逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583624?source=rss",
      "publishedAt": "2026-06-09T22:28:58.000Z",
      "xQuery": "AIに相談し恐喝疑い 少女ら逮捕"
    },
    {
      "time": "07:55",
      "title": "大きめが映える? タンブラー人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583627?source=rss",
      "publishedAt": "2026-06-09T22:55:48.000Z",
      "xQuery": "大きめが映える? タンブラー人気"
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
