window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T13:40:03.207Z",
  "items": [
    {
      "time": "19:05",
      "title": "日本への留学生40万人 過去最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582206?source=rss",
      "publishedAt": "2026-05-29T10:05:09.000Z",
      "xQuery": "日本への留学生40万人 過去最多"
    },
    {
      "time": "21:25",
      "title": "海外で息子が過労自死 母の闘い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582222?source=rss",
      "publishedAt": "2026-05-29T12:25:58.000Z",
      "xQuery": "海外で息子が過労自死 母の闘い"
    },
    {
      "time": "21:04",
      "title": "サンリオ常務の不適切受給2.5億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582221?source=rss",
      "publishedAt": "2026-05-29T12:04:38.000Z",
      "xQuery": "サンリオ常務の不適切受給2.5億円"
    },
    {
      "time": "21:21",
      "title": "マイクロバスにはねられ2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582223?source=rss",
      "publishedAt": "2026-05-29T12:21:05.000Z",
      "xQuery": "マイクロバスにはねられ2人死亡"
    },
    {
      "time": "20:52",
      "title": "自転車15歳死亡 ひき逃げ疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582219?source=rss",
      "publishedAt": "2026-05-29T11:52:45.000Z",
      "xQuery": "自転車15歳死亡 ひき逃げ疑い逮捕"
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
