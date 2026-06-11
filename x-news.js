window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T00:01:34.868Z",
  "items": [
    {
      "time": "08:26",
      "title": "米軍 イラン国内への攻撃を再開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583766?source=rss",
      "publishedAt": "2026-06-10T23:26:27.000Z",
      "xQuery": "米軍 イラン国内への攻撃を再開"
    },
    {
      "time": "08:27",
      "title": "イラン ホルムズ海峡封鎖を宣言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583767?source=rss",
      "publishedAt": "2026-06-10T23:27:30.000Z",
      "xQuery": "イラン ホルムズ海峡封鎖を宣言"
    },
    {
      "time": "07:17",
      "title": "信越化学 レアアース工場を新設へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583757?source=rss",
      "publishedAt": "2026-06-10T22:17:15.000Z",
      "xQuery": "信越化学 レアアース工場を新設へ"
    },
    {
      "time": "06:40",
      "title": "サグラダファミリア主塔完成 祝福",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583753?source=rss",
      "publishedAt": "2026-06-10T21:40:17.000Z",
      "xQuery": "サグラダファミリア主塔完成 祝福"
    },
    {
      "time": "07:25",
      "title": "高級かんきつ新品種 中国流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583756?source=rss",
      "publishedAt": "2026-06-10T22:25:30.000Z",
      "xQuery": "高級かんきつ新品種 中国流出か"
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
