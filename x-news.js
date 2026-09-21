window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T22:38:07.185Z",
  "items": [
    {
      "time": "23:14",
      "title": "大島町 土砂災害危険警報に切替",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596081?source=rss",
      "publishedAt": "2026-09-21T14:14:43.000Z",
      "xQuery": "大島町 土砂災害危険警報に切替"
    },
    {
      "time": "00:19",
      "title": "三浦半島 土砂崩れ相次ぎ1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596085?source=rss",
      "publishedAt": "2026-09-21T15:19:58.000Z",
      "xQuery": "三浦半島 土砂崩れ相次ぎ1人死亡"
    },
    {
      "time": "23:25",
      "title": "高滝ダム緊急放流 見合わせる方向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596080?source=rss",
      "publishedAt": "2026-09-21T14:25:11.000Z",
      "xQuery": "高滝ダム緊急放流 見合わせる方向"
    },
    {
      "time": "22:53",
      "title": "東京・目黒区の住宅街 擁壁崩れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596076?source=rss",
      "publishedAt": "2026-09-21T13:53:04.000Z",
      "xQuery": "東京・目黒区の住宅街 擁壁崩れる"
    },
    {
      "time": "23:33",
      "title": "22歳死亡 発見時豚が覆いかぶさる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596082?source=rss",
      "publishedAt": "2026-09-21T14:33:22.000Z",
      "xQuery": "22歳死亡 発見時豚が覆いかぶさる"
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
