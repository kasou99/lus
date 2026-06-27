window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T02:23:56.371Z",
  "items": [
    {
      "time": "07:48",
      "title": "台風7号 関東甲信は大雨に警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585827?source=rss",
      "publishedAt": "2026-06-26T22:48:09.000Z",
      "xQuery": "台風7号 関東甲信は大雨に警戒を"
    },
    {
      "time": "08:53",
      "title": "ベネズエラ地震 約5万人安否不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585838?source=rss",
      "publishedAt": "2026-06-26T23:53:40.000Z",
      "xQuery": "ベネズエラ地震 約5万人安否不明"
    },
    {
      "time": "09:06",
      "title": "露大統領の最側近 イワノフ氏死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585839?source=rss",
      "publishedAt": "2026-06-27T00:06:13.000Z",
      "xQuery": "露大統領の最側近 イワノフ氏死去"
    },
    {
      "time": "09:20",
      "title": "4人が乗った車が横転 2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585840?source=rss",
      "publishedAt": "2026-06-27T00:20:40.000Z",
      "xQuery": "4人が乗った車が横転 2人死亡"
    },
    {
      "time": "10:06",
      "title": "米政府 一部にミュトス提供を許可",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585846?source=rss",
      "publishedAt": "2026-06-27T01:06:56.000Z",
      "xQuery": "米政府 一部にミュトス提供を許可"
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
