window.LUS_X_NEWS = {
  "updatedAt": "2026-08-13T00:34:54.314Z",
  "items": [
    {
      "time": "08:27",
      "title": "国旗損壊 捜査幹部から懸念の声も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591524?source=rss",
      "publishedAt": "2026-08-12T23:27:06.000Z",
      "xQuery": "国旗損壊 捜査幹部から懸念の声も"
    },
    {
      "time": "07:26",
      "title": "猛暑常態化 工事の「夏季休工」増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591517?source=rss",
      "publishedAt": "2026-08-12T22:26:46.000Z",
      "xQuery": "猛暑常態化 工事の「夏季休工」増"
    },
    {
      "time": "07:50",
      "title": "米大統領報道官が今月で辞任 発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591519?source=rss",
      "publishedAt": "2026-08-12T22:50:02.000Z",
      "xQuery": "米大統領報道官が今月で辞任 発表"
    },
    {
      "time": "09:04",
      "title": "川崎市でニシキヘビ2匹が脱走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591532?source=rss",
      "publishedAt": "2026-08-13T00:04:28.000Z",
      "xQuery": "川崎市でニシキヘビ2匹が脱走"
    },
    {
      "time": "08:15",
      "title": "高密度の金含む鉱石 相次ぎ発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591523?source=rss",
      "publishedAt": "2026-08-12T23:15:03.000Z",
      "xQuery": "高密度の金含む鉱石 相次ぎ発見"
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
