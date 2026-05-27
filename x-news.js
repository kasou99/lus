window.LUS_X_NEWS = {
  "updatedAt": "2026-05-27T01:10:57.211Z",
  "items": [
    {
      "time": "08:39",
      "title": "企業利益は成長投資へ 政府新指針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581846?source=rss",
      "publishedAt": "2026-05-26T23:39:13.000Z",
      "xQuery": "企業利益は成長投資へ 政府新指針"
    },
    {
      "time": "07:42",
      "title": "トランプ氏苦境「譲歩」余儀なく",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581840?source=rss",
      "publishedAt": "2026-05-26T22:42:13.000Z",
      "xQuery": "トランプ氏苦境「譲歩」余儀なく"
    },
    {
      "time": "09:17",
      "title": "日経平均 一時初の6万6000円超え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581853?source=rss",
      "publishedAt": "2026-05-27T00:17:36.000Z",
      "xQuery": "日経平均 一時初の6万6000円超え"
    },
    {
      "time": "08:52",
      "title": "病院で殺害疑い 入院患者の男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581850?source=rss",
      "publishedAt": "2026-05-26T23:52:57.000Z",
      "xQuery": "病院で殺害疑い 入院患者の男逮捕"
    },
    {
      "time": "08:05",
      "title": "千葉・市川 モスクの公園使用可に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581842?source=rss",
      "publishedAt": "2026-05-26T23:05:38.000Z",
      "xQuery": "千葉・市川 モスクの公園使用可に"
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
