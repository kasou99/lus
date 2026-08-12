window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T21:48:50.814Z",
  "items": [
    {
      "time": "06:34",
      "title": "東北から近畿 急な雨や落雷に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591511?source=rss",
      "publishedAt": "2026-08-12T21:34:15.000Z",
      "xQuery": "東北から近畿 急な雨や落雷に注意"
    },
    {
      "time": "06:43",
      "title": "日本国旗損壊罪法 きょう施行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591512?source=rss",
      "publishedAt": "2026-08-12T21:43:29.000Z",
      "xQuery": "日本国旗損壊罪法 きょう施行"
    },
    {
      "time": "22:43",
      "title": "「性的侮辱」問題 豪が日本に釈明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591502?source=rss",
      "publishedAt": "2026-08-12T13:43:57.000Z",
      "xQuery": "「性的侮辱」問題 豪が日本に釈明"
    },
    {
      "time": "06:21",
      "title": "公園に身元不明の遺体 名古屋市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591509?source=rss",
      "publishedAt": "2026-08-12T21:21:54.000Z",
      "xQuery": "公園に身元不明の遺体 名古屋市"
    },
    {
      "time": "06:12",
      "title": "特急列車 車との衝突気付かず走行",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591508?source=rss",
      "publishedAt": "2026-08-12T21:12:01.000Z",
      "xQuery": "特急列車 車との衝突気付かず走行"
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
