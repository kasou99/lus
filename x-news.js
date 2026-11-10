window.LUS_X_NEWS = {
  "updatedAt": "2026-11-10T23:09:05.737Z",
  "items": [
    {
      "time": "07:58",
      "title": "米国防長官 自身への弾劾「茶番」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602114?source=rss",
      "publishedAt": "2026-11-10T22:58:18.000Z",
      "xQuery": "米国防長官 自身への弾劾「茶番」"
    },
    {
      "time": "07:26",
      "title": "G7外相会合 ウ支援で声明公表へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602111?source=rss",
      "publishedAt": "2026-11-10T22:26:40.000Z",
      "xQuery": "G7外相会合 ウ支援で声明公表へ"
    },
    {
      "time": "06:39",
      "title": "小泉氏 首相総裁選出馬なら支える",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602107?source=rss",
      "publishedAt": "2026-11-10T21:39:18.000Z",
      "xQuery": "小泉氏 首相総裁選出馬なら支える"
    },
    {
      "time": "06:27",
      "title": "女性搬送の救急車事故 病院で死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602106?source=rss",
      "publishedAt": "2026-11-10T21:27:11.000Z",
      "xQuery": "女性搬送の救急車事故 病院で死亡"
    },
    {
      "time": "07:40",
      "title": "生徒乗る遊覧船定員1.7倍で航行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602112?source=rss",
      "publishedAt": "2026-11-10T22:40:19.000Z",
      "xQuery": "生徒乗る遊覧船定員1.7倍で航行か"
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
