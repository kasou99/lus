window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T00:53:19.564Z",
  "items": [
    {
      "time": "09:24",
      "title": "台風 太平洋側は大雨や暴風に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595987?source=rss",
      "publishedAt": "2026-09-21T00:24:21.000Z",
      "xQuery": "台風 太平洋側は大雨や暴風に警戒"
    },
    {
      "time": "08:50",
      "title": "千葉市で道路冠水 車水没の被害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595984?source=rss",
      "publishedAt": "2026-09-20T23:50:03.000Z",
      "xQuery": "千葉市で道路冠水 車水没の被害"
    },
    {
      "time": "08:29",
      "title": "中東エネ巡る支援 首相が表明へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595981?source=rss",
      "publishedAt": "2026-09-20T23:29:56.000Z",
      "xQuery": "中東エネ巡る支援 首相が表明へ"
    },
    {
      "time": "08:15",
      "title": "イラン 戦闘終結へ米に7条件伝達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595980?source=rss",
      "publishedAt": "2026-09-20T23:15:39.000Z",
      "xQuery": "イラン 戦闘終結へ米に7条件伝達"
    },
    {
      "time": "08:05",
      "title": "渋谷で若者離れ? 人流データ分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595978?source=rss",
      "publishedAt": "2026-09-20T23:05:01.000Z",
      "xQuery": "渋谷で若者離れ? 人流データ分析"
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
