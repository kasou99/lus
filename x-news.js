window.LUS_X_NEWS = {
  "updatedAt": "2026-08-26T00:21:53.432Z",
  "items": [
    {
      "time": "06:41",
      "title": "台風 沖縄・奄美は昼前にかけ暴風",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593083?source=rss",
      "publishedAt": "2026-08-25T21:41:16.000Z",
      "xQuery": "台風 沖縄・奄美は昼前にかけ暴風"
    },
    {
      "time": "07:18",
      "title": "米CIA長官が訪露 和平協議目的か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593085?source=rss",
      "publishedAt": "2026-08-25T22:18:11.000Z",
      "xQuery": "米CIA長官が訪露 和平協議目的か"
    },
    {
      "time": "07:43",
      "title": "4人死亡 見張り員所定位置おらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593087?source=rss",
      "publishedAt": "2026-08-25T22:43:18.000Z",
      "xQuery": "4人死亡 見張り員所定位置おらず"
    },
    {
      "time": "08:13",
      "title": "免職と誤報 北陸放送に賠償命じる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593090?source=rss",
      "publishedAt": "2026-08-25T23:13:51.000Z",
      "xQuery": "免職と誤報 北陸放送に賠償命じる"
    },
    {
      "time": "09:05",
      "title": "ジムニー対抗車 他社が作らない訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593096?source=rss",
      "publishedAt": "2026-08-26T00:05:42.000Z",
      "xQuery": "ジムニー対抗車 他社が作らない訳"
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
