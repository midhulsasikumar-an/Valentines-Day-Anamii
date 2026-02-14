const SECRET_PASSWORD = "ourlove";

const PAGE_ORDER = [
  "rose.html",
  "propose.html",
  "chocolate.html",
  "teddy.html",
  "promise.html",
  "hug.html",
  "valentine.html"
];

function getCurrentPage() {
  const raw = window.location.pathname.split("/").pop() || "";
  return raw.toLowerCase();
}

function navigateTo(page) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 280);
}

function goToNext() {
  const current = getCurrentPage();
  const index = PAGE_ORDER.indexOf(current);
  if (index >= 0 && index < PAGE_ORDER.length - 1) {
    navigateTo(PAGE_ORDER[index + 1]);
  }
}

function goToNextWithPetal() {
  if (getCurrentPage() !== "rose.html") {
    goToNext();
    return;
  }
  createPetalBurst(12);
  setTimeout(() => {
    goToNext();
  }, 340);
}

function goToPrev() {
  const current = getCurrentPage();
  const index = PAGE_ORDER.indexOf(current);
  if (index > 0) {
    navigateTo(PAGE_ORDER[index - 1]);
  }
}

function openSecretPage() {
  const input = prompt("Enter the secret code to open the midnight letter:");
  if (input === null) {
    return;
  }

  if (input.trim().toLowerCase() === SECRET_PASSWORD) {
    navigateTo("midnight.html");
  } else {
    alert("Wrong password... but your smile is still the right key.");
  }
}

function setupTopControls() {
  const pageMain = document.querySelector(".page-main");
  if (!pageMain) {
    return;
  }

  const current = getCurrentPage();
  const dayIndex = PAGE_ORDER.indexOf(current);

  const wrap = document.createElement("div");
  wrap.className = "top-tools";

  const progress = document.createElement("div");
  progress.className = "progress-card";

  if (dayIndex >= 0) {
    const pct = ((dayIndex + 1) / PAGE_ORDER.length) * 100;
    progress.innerHTML = `
      <p class="progress-text">Day ${dayIndex + 1} of ${PAGE_ORDER.length}</p>
      <div class="progress-track"><span class="progress-fill" style="width:${pct}%"></span></div>
    `;
  } else if (current === "midnight.html") {
    progress.innerHTML = `
      <p class="progress-text">Secret Midnight Chapter</p>
      <div class="progress-track"><span class="progress-fill" style="width:100%"></span></div>
    `;
  }

  wrap.appendChild(progress);
  pageMain.prepend(wrap);
}

function setupProposeInteraction() {
  const proposeBtn = document.getElementById("proposeYesBtn");
  const response = document.getElementById("proposalResponse");
  const proposePage = document.querySelector(".propose-section, .propose-page");

  if (!proposeBtn || !response || !proposePage) {
    return;
  }

  proposeBtn.addEventListener("click", () => {
    response.textContent = "You already had my heart.";
    response.classList.add("show-response");
    createHeartBurst(proposeBtn);
    const ring = document.querySelector(".ring-container");
    if (ring) {
      ring.classList.add("show-ring");
    }
    proposePage.classList.remove("propose-pulse");
    void proposePage.offsetWidth;
    proposePage.classList.add("propose-pulse");
    setTimeout(() => {
      proposePage.classList.remove("propose-pulse");
    }, 900);
  });
}

function setupVirtualHug() {
  const hugBtn = document.getElementById("hugBtn");
  const teddy = document.getElementById("teddyBear");

  if (!hugBtn || !teddy) {
    return;
  }

  hugBtn.addEventListener("click", () => {
    teddy.classList.remove("hug-animate");
    void teddy.offsetWidth;
    teddy.classList.add("hug-animate");

    hugBtn.textContent = "Hug Sent With Love";
    setTimeout(() => {
      hugBtn.textContent = "Virtual Hug";
    }, 1600);
  });
}

function setupPromiseChecks() {
  const items = document.querySelectorAll(".promise-item");
  if (!items.length) {
    return;
  }

  items.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add("checked");
    }, 300 + idx * 320);
  });
}

function setupCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) {
    return;
  }

  const now = new Date();
  let target = new Date(now.getFullYear(), now.getMonth() + 1, 14, 0, 0, 0);

  if (target <= now) {
    target = new Date(now.getFullYear(), now.getMonth() + 2, 14, 0, 0, 0);
  }

  const tick = () => {
    const diff = target - new Date();
    if (diff <= 0) {
      countdown.textContent = "It is our day again. Meet me where your heart feels at home.";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.textContent = `Next little date in ${days}d ${hours}h ${mins}m ${secs}s`;
  };

  tick();
  setInterval(tick, 1000);
}

function setupFloatingSymbols() {
  const containers = document.querySelectorAll(".symbol-rain");
  containers.forEach((container) => {
    const symbol = container.dataset.symbol || "❤";
    const count = Number(container.dataset.count || 12);

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement("span");
      el.className = "float-symbol";
      el.textContent = symbol;
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDuration = `${5 + Math.random() * 5}s`;
      el.style.animationDelay = `${Math.random() * 2}s`;
      el.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      container.appendChild(el);
    }
  });
}

function getPetalOverlay() {
  let overlay = document.getElementById("petalOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "petalOverlay";
    overlay.className = "petal-overlay";
    document.body.appendChild(overlay);
  }
  return overlay;
}

function createPetalBurst(count, host = null) {
  const target = host || getPetalOverlay();
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("span");
    petal.className = "rose-petal";
    petal.textContent = "❀";
    petal.style.left = `${8 + Math.random() * 84}%`;
    petal.style.animationDuration = `${1.8 + Math.random() * 1.3}s`;
    petal.style.animationDelay = `${Math.random() * 0.2}s`;
    petal.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
    petal.style.setProperty("--drift", `${-36 + Math.random() * 72}px`);
    target.appendChild(petal);
    setTimeout(() => {
      petal.remove();
    }, 2600);
  }
}

function createHeartBurst(originEl) {
  const burst = document.createElement("div");
  burst.className = "heart-burst";
  document.body.appendChild(burst);

  const rect = originEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = "❤";
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.setProperty("--x", `${-70 + Math.random() * 140}px`);
    heart.style.setProperty("--y", `${-65 - Math.random() * 85}px`);
    heart.style.animationDelay = `${Math.random() * 0.12}s`;
    burst.appendChild(heart);
  }

  setTimeout(() => {
    burst.remove();
  }, 1200);
}

function setupRoseScene() {
  if (getCurrentPage() !== "rose.html") {
    return;
  }

  const illustration = document.getElementById("roseIllustration");
  const localLayer = document.getElementById("rosePetalLayer");
  if (!illustration || !localLayer) {
    return;
  }

  let lastHoverBurst = 0;
  illustration.addEventListener("mouseenter", () => {
    const now = Date.now();
    if (now - lastHoverBurst < 1200) {
      return;
    }
    lastHoverBurst = now;
    createPetalBurst(7, localLayer);
  });
}

function setupChocolateWarmth() {
  const section = document.querySelector(".chocolate-section");
  if (!section) {
    return;
  }

  section.addEventListener("click", () => {
    section.classList.remove("steam-boost");
    void section.offsetWidth;
    section.classList.add("steam-boost");

    const puff = document.createElement("span");
    puff.className = "steam-heart-puff";
    puff.textContent = "❤";
    section.appendChild(puff);

    setTimeout(() => {
      section.classList.remove("steam-boost");
      puff.remove();
    }, 2000);
  });
}

function setupTeddyAura() {
  const section = document.querySelector(".teddy-section");
  if (!section) {
    return;
  }

  section.addEventListener("click", () => {
    const aura = document.createElement("span");
    aura.className = "teddy-aura";
    section.appendChild(aura);

    setTimeout(() => {
      aura.remove();
    }, 1900);
  });
}

function setupPreEntryScreen() {
  const screen = document.querySelector(".pre-entry-section");
  if (!screen) {
    return;
  }

  const mini = document.getElementById("preEntryMini");
  const miniText = mini ? mini.dataset.text || "" : "";
  const enterBtn = document.getElementById("enterLoveStoryBtn");
  const waitBtn = document.getElementById("waitHugBtn");
  const fadeLayer = document.getElementById("preEntryFade");
  const burstLayer = document.getElementById("preEntryBurst");
  const popup = document.getElementById("hugPopup");
  const closePopupBtn = document.getElementById("closeHugPopupBtn");

  if (mini) {
    setTimeout(() => {
      mini.classList.add("show");
      let idx = 0;
      mini.textContent = "";
      const timer = setInterval(() => {
        mini.textContent += miniText[idx];
        idx += 1;
        if (idx >= miniText.length) {
          clearInterval(timer);
        }
      }, 28);
    }, 2000);
  }

  const spawnBurst = (x, y) => {
    if (!burstLayer) {
      return;
    }
    for (let i = 0; i < 14; i += 1) {
      const heart = document.createElement("span");
      heart.className = "pre-entry-burst-heart";
      heart.textContent = "❤";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty("--x", `${-100 + Math.random() * 200}px`);
      heart.style.setProperty("--y", `${-95 + Math.random() * 180}px`);
      heart.style.animationDelay = `${Math.random() * 0.12}s`;
      burstLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    }
  };

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      const rect = enterBtn.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      if (fadeLayer) {
        fadeLayer.classList.add("show");
      }

      setTimeout(() => {
        window.location.href = "rose.html";
      }, 900);
    });
  }

  if (waitBtn && popup) {
    waitBtn.addEventListener("click", () => {
      popup.classList.add("show");
    });
  }

  if (closePopupBtn && popup) {
    closePopupBtn.addEventListener("click", () => {
      popup.classList.remove("show");
    });
  }
}

function setupSharedRomanticButtons() {
  const current = getCurrentPage();
  if (current === "promise.html" || current === "valentine.html") {
    return;
  }

  const page = document.querySelector("section.page");
  const buttons = document.querySelectorAll(".btn");
  if (!buttons.length) {
    return;
  }

  const burstContainer = document.createElement("div");
  burstContainer.className = "romance-burst-layer";
  document.body.appendChild(burstContainer);

  buttons.forEach((btn) => {
    btn.classList.add("romance-btn");
    if (btn.classList.contains("btn-secondary")) {
      btn.classList.add("romance-btn-secondary");
    } else {
      btn.classList.add("romance-btn-primary");
    }

    btn.addEventListener("click", () => {
      if (page) {
        page.classList.remove("romance-page-pulse");
        void page.offsetWidth;
        page.classList.add("romance-page-pulse");
        setTimeout(() => {
          page.classList.remove("romance-page-pulse");
        }, 850);
      }

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 10; i += 1) {
        const spark = document.createElement("span");
        spark.className = "romance-click-spark";
        spark.style.left = `${centerX}px`;
        spark.style.top = `${centerY}px`;
        spark.style.setProperty("--x", `${-90 + Math.random() * 180}px`);
        spark.style.setProperty("--y", `${-85 + Math.random() * 170}px`);
        spark.style.animationDelay = `${Math.random() * 0.12}s`;
        burstContainer.appendChild(spark);
        setTimeout(() => {
          spark.remove();
        }, 1200);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTopControls();
  setupFloatingSymbols();
  setupRoseScene();
  setupChocolateWarmth();
  setupTeddyAura();
  setupPreEntryScreen();
  setupSharedRomanticButtons();
  setupProposeInteraction();
  setupVirtualHug();
  setupPromiseChecks();
  setupCountdown();
});
