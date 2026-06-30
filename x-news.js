window.LUS_X_NEWS = {
  "updatedAt": "2026-06-30T03:49:14.072Z",
  "items": [
    {
      "time": "12:42",
      "title": "皇室典範改正案 自維が提出合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586219?source=rss",
      "publishedAt": "2026-06-30T03:42:26.000Z",
      "xQuery": "皇室典範改正案 自維が提出合意"
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
      "time": "11:48",
      "title": "夫婦殺害 2被告に無期懲役を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586209?source=rss",
      "publishedAt": "2026-06-30T02:48:24.000Z",
      "xQuery": "夫婦殺害 2被告に無期懲役を求刑"
    },
    {
      "time": "10:42",
      "title": "衆参議員の平均所得3003万円 25年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586201?source=rss",
      "publishedAt": "2026-06-30T01:42:12.000Z",
      "xQuery": "衆参議員の平均所得3003万円 25年"
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
