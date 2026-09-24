window.LUS_X_NEWS = {
  "updatedAt": "2026-09-24T01:28:34.708Z",
  "items": [
    {
      "time": "09:36",
      "title": "米中の貿易休戦 2カ月延長で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596332?source=rss",
      "publishedAt": "2026-09-24T00:36:01.000Z",
      "xQuery": "米中の貿易休戦 2カ月延長で合意"
    },
    {
      "time": "07:36",
      "title": "台風影響 内房線の復旧に3カ月超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596323?source=rss",
      "publishedAt": "2026-09-23T22:36:22.000Z",
      "xQuery": "台風影響 内房線の復旧に3カ月超"
    },
    {
      "time": "09:32",
      "title": "印旛沼「いつ決壊したのか」不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596333?source=rss",
      "publishedAt": "2026-09-24T00:32:52.000Z",
      "xQuery": "印旛沼「いつ決壊したのか」不明"
    },
    {
      "time": "08:05",
      "title": "会社役員刺され重体 従業員ら逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596326?source=rss",
      "publishedAt": "2026-09-23T23:05:02.000Z",
      "xQuery": "会社役員刺され重体 従業員ら逮捕"
    },
    {
      "time": "09:24",
      "title": "ANA機脱出 乗客「ガタガタ音」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596330?source=rss",
      "publishedAt": "2026-09-24T00:24:33.000Z",
      "xQuery": "ANA機脱出 乗客「ガタガタ音」"
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
