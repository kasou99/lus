window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T03:50:02.998Z",
  "items": [
    {
      "time": "11:18",
      "title": "熱帯低気圧が発生 台風シーズンへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586315?source=rss",
      "publishedAt": "2026-07-01T02:18:03.000Z",
      "xQuery": "熱帯低気圧が発生 台風シーズンへ"
    },
    {
      "time": "11:54",
      "title": "路線価の全国平均 5年連続上昇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586324?source=rss",
      "publishedAt": "2026-07-01T02:54:34.000Z",
      "xQuery": "路線価の全国平均 5年連続上昇"
    },
    {
      "time": "12:31",
      "title": "女性と女児死亡 父親を発見し逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586330?source=rss",
      "publishedAt": "2026-07-01T03:31:50.000Z",
      "xQuery": "女性と女児死亡 父親を発見し逮捕"
    },
    {
      "time": "11:00",
      "title": "配信中の女性殺害 起訴内容認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586313?source=rss",
      "publishedAt": "2026-07-01T02:00:22.000Z",
      "xQuery": "配信中の女性殺害 起訴内容認める"
    },
    {
      "time": "10:32",
      "title": "バーチャル背景NG 会議謎ルール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586309?source=rss",
      "publishedAt": "2026-07-01T01:32:57.000Z",
      "xQuery": "バーチャル背景NG 会議謎ルール"
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
