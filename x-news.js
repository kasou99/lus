window.LUS_X_NEWS = {
  "updatedAt": "2026-06-27T12:42:22.286Z",
  "items": [
    {
      "time": "21:16",
      "title": "台風接近で記録的雨 土砂崩れ警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585927?source=rss",
      "publishedAt": "2026-06-27T12:16:11.000Z",
      "xQuery": "台風接近で記録的雨 土砂崩れ警戒"
    },
    {
      "time": "21:09",
      "title": "中露の軍 日本海など戦略合同飛行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585925?source=rss",
      "publishedAt": "2026-06-27T12:09:51.000Z",
      "xQuery": "中露の軍 日本海など戦略合同飛行"
    },
    {
      "time": "21:24",
      "title": "無音の110番通報 川で溺れ2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585928?source=rss",
      "publishedAt": "2026-06-27T12:24:06.000Z",
      "xQuery": "無音の110番通報 川で溺れ2人死亡"
    },
    {
      "time": "21:11",
      "title": "川に車転落 流されそうな2歳救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585926?source=rss",
      "publishedAt": "2026-06-27T12:11:53.000Z",
      "xQuery": "川に車転落 流されそうな2歳救助"
    },
    {
      "time": "19:22",
      "title": "北京ビルに小型機 1人死亡と当局",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585912?source=rss",
      "publishedAt": "2026-06-27T10:22:52.000Z",
      "xQuery": "北京ビルに小型機 1人死亡と当局"
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
