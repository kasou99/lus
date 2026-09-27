window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T00:56:25.267Z",
  "items": [
    {
      "time": "07:27",
      "title": "九州4県に「線状降水帯」直前予測",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596674?source=rss",
      "publishedAt": "2026-09-26T22:27:38.000Z",
      "xQuery": "九州4県に「線状降水帯」直前予測"
    },
    {
      "time": "07:35",
      "title": "米大統領 海峡巡るイラン提案拒否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596675?source=rss",
      "publishedAt": "2026-09-26T22:35:03.000Z",
      "xQuery": "米大統領 海峡巡るイラン提案拒否"
    },
    {
      "time": "09:21",
      "title": "飲酒事故で子失い2年 判決に怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596683?source=rss",
      "publishedAt": "2026-09-27T00:21:27.000Z",
      "xQuery": "飲酒事故で子失い2年 判決に怒り"
    },
    {
      "time": "07:22",
      "title": "プロバスケ選手逮捕 わいせつ疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596673?source=rss",
      "publishedAt": "2026-09-26T22:22:06.000Z",
      "xQuery": "プロバスケ選手逮捕 わいせつ疑い"
    },
    {
      "time": "08:32",
      "title": "代替コーヒー 背景に2050年問題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596680?source=rss",
      "publishedAt": "2026-09-26T23:32:43.000Z",
      "xQuery": "代替コーヒー 背景に2050年問題"
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
