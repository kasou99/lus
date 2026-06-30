window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T05:32:33.384Z",
  "items": [
    {
      "time": "13:39",
      "title": "国旗損壊罪の創設法案 衆院で可決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586224?source=rss",
      "publishedAt": "2026-06-30T04:39:07.000Z",
      "xQuery": "国旗損壊罪の創設法案 衆院で可決"
    },
    {
      "time": "12:58",
      "title": "副首都法案が審議入り 野党は欠席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586218?source=rss",
      "publishedAt": "2026-06-30T03:58:27.000Z",
      "xQuery": "副首都法案が審議入り 野党は欠席"
    },
    {
      "time": "14:03",
      "title": "アフラック 438万人分の情報流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586227?source=rss",
      "publishedAt": "2026-06-30T05:03:20.000Z",
      "xQuery": "アフラック 438万人分の情報流出"
    },
    {
      "time": "12:04",
      "title": "1ドル162円台 介入に警戒高まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586211?source=rss",
      "publishedAt": "2026-06-30T03:04:20.000Z",
      "xQuery": "1ドル162円台 介入に警戒高まる"
    },
    {
      "time": "11:29",
      "title": "国家公務員 ボーナス平均73万円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586205?source=rss",
      "publishedAt": "2026-06-30T02:29:29.000Z",
      "xQuery": "国家公務員 ボーナス平均73万円超"
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
