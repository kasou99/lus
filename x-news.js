window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T22:37:34.078Z",
  "items": [
    {
      "time": "06:29",
      "title": "台風と秋雨前線 大雨長期化の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594040?source=rss",
      "publishedAt": "2026-09-02T21:29:11.000Z",
      "xQuery": "台風と秋雨前線 大雨長期化の恐れ"
    },
    {
      "time": "06:58",
      "title": "自民の鈴木幹事長続投へ 首相意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594042?source=rss",
      "publishedAt": "2026-09-02T21:58:07.000Z",
      "xQuery": "自民の鈴木幹事長続投へ 首相意向"
    },
    {
      "time": "21:43",
      "title": "上皇さまの葬儀規模 大幅縮小検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594027?source=rss",
      "publishedAt": "2026-09-02T12:43:30.000Z",
      "xQuery": "上皇さまの葬儀規模 大幅縮小検討"
    },
    {
      "time": "06:14",
      "title": "「匿流」スマホ遠隔解析へ 提言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594038?source=rss",
      "publishedAt": "2026-09-02T21:14:43.000Z",
      "xQuery": "「匿流」スマホ遠隔解析へ 提言"
    },
    {
      "time": "07:20",
      "title": "大阪市「民泊」開業の規制強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594043?source=rss",
      "publishedAt": "2026-09-02T22:20:19.000Z",
      "xQuery": "大阪市「民泊」開業の規制強化へ"
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
