window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T01:33:48.401Z",
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
      "time": "10:27",
      "title": "台風25号 空の便にも大きな影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595992?source=rss",
      "publishedAt": "2026-09-21T01:27:12.000Z",
      "xQuery": "台風25号 空の便にも大きな影響"
    },
    {
      "time": "09:53",
      "title": "富士山頂の混雑で転倒懸念 検証へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595990?source=rss",
      "publishedAt": "2026-09-21T00:53:00.000Z",
      "xQuery": "富士山頂の混雑で転倒懸念 検証へ"
    },
    {
      "time": "09:32",
      "title": "改造内閣「革命的人事」の舞台裏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595988?source=rss",
      "publishedAt": "2026-09-21T00:32:23.000Z",
      "xQuery": "改造内閣「革命的人事」の舞台裏"
    },
    {
      "time": "09:57",
      "title": "中高年男性の耳毛 なぜ太く伸びる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595989?source=rss",
      "publishedAt": "2026-09-21T00:57:17.000Z",
      "xQuery": "中高年男性の耳毛 なぜ太く伸びる"
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
