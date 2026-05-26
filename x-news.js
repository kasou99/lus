window.LUS_X_NEWS = {
  "updatedAt": "2026-05-26T23:32:12.132Z",
  "items": [
    {
      "time": "07:35",
      "title": "首相 再審制度「反省のもと改善」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581839?source=rss",
      "publishedAt": "2026-05-26T22:35:56.000Z",
      "xQuery": "首相 再審制度「反省のもと改善」"
    },
    {
      "time": "06:10",
      "title": "栃木強殺を主導か 40代男に逮捕状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581830?source=rss",
      "publishedAt": "2026-05-26T21:10:56.000Z",
      "xQuery": "栃木強殺を主導か 40代男に逮捕状"
    },
    {
      "time": "08:05",
      "title": "千葉・市川 モスクの公園使用可に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581842?source=rss",
      "publishedAt": "2026-05-26T23:05:38.000Z",
      "xQuery": "千葉・市川 モスクの公園使用可に"
    },
    {
      "time": "07:14",
      "title": "日系企業の米工場で爆発 死傷者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581835?source=rss",
      "publishedAt": "2026-05-26T22:14:44.000Z",
      "xQuery": "日系企業の米工場で爆発 死傷者"
    },
    {
      "time": "07:11",
      "title": "駐車場で事故 運転代わり再び事故",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581834?source=rss",
      "publishedAt": "2026-05-26T22:11:10.000Z",
      "xQuery": "駐車場で事故 運転代わり再び事故"
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
