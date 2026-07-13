window.LUS_X_NEWS = {
  "updatedAt": "2026-07-13T06:06:04.673Z",
  "items": [
    {
      "time": "09:38",
      "title": "国旗損壊罪法案 賛否対立する理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587746?source=rss",
      "publishedAt": "2026-07-13T00:38:15.000Z",
      "xQuery": "国旗損壊罪法案 賛否対立する理由"
    },
    {
      "time": "14:21",
      "title": "熱波原因か 欧州で死者1万人超に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587780?source=rss",
      "publishedAt": "2026-07-13T05:21:51.000Z",
      "xQuery": "熱波原因か 欧州で死者1万人超に"
    },
    {
      "time": "13:57",
      "title": "大分刺傷 現場の店員「怖かった」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587779?source=rss",
      "publishedAt": "2026-07-13T04:57:36.000Z",
      "xQuery": "大分刺傷 現場の店員「怖かった」"
    },
    {
      "time": "14:35",
      "title": "立花孝志氏の脅迫疑い 不起訴不当",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587782?source=rss",
      "publishedAt": "2026-07-13T05:35:54.000Z",
      "xQuery": "立花孝志氏の脅迫疑い 不起訴不当"
    },
    {
      "time": "13:07",
      "title": "露スパイの拠点に日本 米紙報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587771?source=rss",
      "publishedAt": "2026-07-13T04:07:18.000Z",
      "xQuery": "露スパイの拠点に日本 米紙報道"
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
