window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T02:25:15.835Z",
  "items": [
    {
      "time": "11:19",
      "title": "電気ガス代補助 5000億円支出決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581740?source=rss",
      "publishedAt": "2026-05-26T02:19:22.000Z",
      "xQuery": "電気ガス代補助 5000億円支出決定"
    },
    {
      "time": "10:48",
      "title": "東大病院汚職 贈賄側に有罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581733?source=rss",
      "publishedAt": "2026-05-26T01:48:02.000Z",
      "xQuery": "東大病院汚職 贈賄側に有罪判決"
    },
    {
      "time": "09:43",
      "title": "阿部監督 娘に「カッとなった」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581725?source=rss",
      "publishedAt": "2026-05-26T00:43:54.000Z",
      "xQuery": "阿部監督 娘に「カッとなった」"
    },
    {
      "time": "08:32",
      "title": "「謎の風邪」感染症専門家が解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581713?source=rss",
      "publishedAt": "2026-05-25T23:32:53.000Z",
      "xQuery": "「謎の風邪」感染症専門家が解説"
    },
    {
      "time": "09:08",
      "title": "マック注文端末巡り物議 広報回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581721?source=rss",
      "publishedAt": "2026-05-26T00:08:27.000Z",
      "xQuery": "マック注文端末巡り物議 広報回答"
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
