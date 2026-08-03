window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T12:07:07.795Z",
  "items": [
    {
      "time": "17:45",
      "title": "熊本県の宿泊キャンセル 約9億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590397?source=rss",
      "publishedAt": "2026-08-03T08:45:45.000Z",
      "xQuery": "熊本県の宿泊キャンセル 約9億円"
    },
    {
      "time": "20:21",
      "title": "日産4～6月期2年ぶり黒字 37億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590414?source=rss",
      "publishedAt": "2026-08-03T11:21:29.000Z",
      "xQuery": "日産4～6月期2年ぶり黒字 37億円"
    },
    {
      "time": "19:15",
      "title": "千葉爆発 前日の夜からガス漏れか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590401?source=rss",
      "publishedAt": "2026-08-03T10:15:03.000Z",
      "xQuery": "千葉爆発 前日の夜からガス漏れか"
    },
    {
      "time": "20:32",
      "title": "「福岡県議会のドン」王国 揺らぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590416?source=rss",
      "publishedAt": "2026-08-03T11:32:10.000Z",
      "xQuery": "「福岡県議会のドン」王国 揺らぐ"
    },
    {
      "time": "20:39",
      "title": "園のライオン3頭死ぬ 他3頭も治療",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590415?source=rss",
      "publishedAt": "2026-08-03T11:39:13.000Z",
      "xQuery": "園のライオン3頭死ぬ 他3頭も治療"
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
