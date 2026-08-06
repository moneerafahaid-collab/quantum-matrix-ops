(() => {
  "use strict";

  function renderBlockMath() {
    if (!window.katex) return;
    document.querySelectorAll("[data-katex]").forEach((el) => {
      if (el.dataset.rendered === "1") return;
      const tex = el.textContent.trim();
      try {
        katex.render(tex, el, {
          throwOnError: false,
          displayMode: true,
          output: "html",
        });
        el.dataset.rendered = "1";
      } catch (_) {
        /* keep raw text */
      }
    });
  }

  function renderInlineMath() {
    if (!window.katex) return;
    const targets = document.querySelectorAll(
      "p, li, dd, .verdict, .tip, .pill, .method, h3, h4, .req-list, span.en, .practice-prompt, .canvas-hint, .muted, .sym-note, .legend-note"
    );
    targets.forEach((el) => {
      if (el.dataset.mathInline === "1") return;
      if (el.hasAttribute("data-katex")) return;
      if (!el.innerHTML.includes("\\(")) return;
      try {
        el.innerHTML = el.innerHTML.replace(/\\\(([\s\S]+?)\\\)/g, (_, tex) =>
          katex.renderToString(tex.trim(), { throwOnError: false, displayMode: false })
        );
        el.dataset.mathInline = "1";
      } catch (_) {
        /* ignore */
      }
    });
  }

  function buildMatrixStream() {
    const host = document.getElementById("matrixStream");
    if (!host) return;
    const glyphs = ["0", "1", "i", "−i", "⊗", "†", "I", "U", "ψ", "⟨", "⟩", "Y"];
    for (let i = 0; i < 48; i++) {
      const span = document.createElement("span");
      span.textContent = glyphs[i % glyphs.length];
      span.style.animationDelay = `${(i % 12) * 0.35}s`;
      host.appendChild(span);
    }
  }

  function setupScrollHelpers() {
    document.querySelectorAll("[data-scroll]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sel = btn.getAttribute("data-scroll");
        document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function setupReveal() {
    const nodes = document.querySelectorAll(
      ".road-card, .panel, .chip, .topic-banner, .summary-table-wrap, .closing-inner, .practice-pad"
    );
    nodes.forEach((n) => n.classList.add("inview"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
  }

  function setupTensorDemo() {
    const btn = document.getElementById("tensorToggle");
    const collapsed = document.getElementById("tensorCollapsed");
    const expanded = document.getElementById("tensorExpanded");
    const box = document.getElementById("tensorResult");
    if (!btn || !collapsed || !expanded) return;

    let open = false;
    btn.addEventListener("click", () => {
      open = !open;
      collapsed.classList.toggle("hidden", open);
      expanded.classList.toggle("hidden", !open);
      box?.classList.toggle("lit", open);
      btn.textContent = open ? "اطوِ المصفوفة" : "وسّع المصفوفة";
    });
  }

  function setupFlipDemo() {
    const demo = document.getElementById("flipDemo");
    const btn = document.getElementById("flipBtn");
    if (!demo || !btn) return;
    btn.addEventListener("click", () => {
      demo.classList.toggle("flipped");
      btn.textContent = demo.classList.contains("flipped") ? "أعد الأصل" : "دوِّر ↻";
    });
  }

  function setupSolver() {
    const startBtn = document.getElementById("startSolve");
    const solver = document.getElementById("solver");
    const tabs = [...document.querySelectorAll(".solver-tab")];
    const panes = [...document.querySelectorAll(".solver-pane")];
    const prev = document.getElementById("prevStep");
    const next = document.getElementById("nextStep");
    const bar = document.getElementById("solverBar");
    const label = document.getElementById("stepLabel");
    let step = 1;

    function go(n) {
      step = Math.max(1, Math.min(3, n));
      tabs.forEach((t) => t.classList.toggle("active", Number(t.dataset.step) === step));
      panes.forEach((p) => p.classList.toggle("active", Number(p.dataset.pane) === step));
      if (bar) bar.style.width = `${(step / 3) * 100}%`;
      if (label) label.textContent = `${step} / 3`;
      if (prev) prev.disabled = step === 1;
      if (next) next.textContent = step === 3 ? "اكتمل ✓" : "التالي";
    }

    startBtn?.addEventListener("click", () => {
      if (!solver) return;
      solver.hidden = false;
      go(1);
      solver.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    tabs.forEach((t) => t.addEventListener("click", () => go(Number(t.dataset.step))));
    prev?.addEventListener("click", () => go(step - 1));
    next?.addEventListener("click", () => {
      if (step < 3) go(step + 1);
    });
  }

  function setupPracticePads() {
    document.querySelectorAll("[data-practice]").forEach((pad) => {
      const canvas = pad.querySelector(".draw-canvas");
      const shell = pad.querySelector(".canvas-shell");
      const clearBtn = pad.querySelector("[data-clear]");
      const revealBtn = pad.querySelector("[data-reveal]");
      const answer = pad.querySelector(".practice-answer");
      if (!canvas || !shell) return;

      const ctx = canvas.getContext("2d");
      let drawing = false;
      let last = null;

      function resize() {
        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(280, Math.floor(rect.width));
        const h = Math.max(220, Math.floor(rect.height));
        const keepInk = shell.classList.contains("has-ink");
        const prev = keepInk ? canvas.toDataURL() : null;
        canvas.width = Math.floor(w * ratio);
        canvas.height = Math.floor(h * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        if (keepInk && prev) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, w, h);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "#0f1c24";
            ctx.lineWidth = 2.4;
          };
          img.src = prev;
        } else {
          drawGrid(w, h);
        }
      }

      function drawGrid(w, h) {
        ctx.save();
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#fbfdfe";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(13, 148, 136, 0.12)";
        ctx.lineWidth = 1;
        const step = 28;
        for (let x = step; x < w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = step; y < h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        // matrix-friendly guide frame
        ctx.strokeStyle = "rgba(15, 28, 36, 0.08)";
        ctx.strokeRect(18, 18, w - 36, h - 36);
        ctx.restore();
        ctx.strokeStyle = "#0f1c24";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }

      function pos(e) {
        const rect = canvas.getBoundingClientRect();
        const point = e.touches ? e.touches[0] : e;
        return {
          x: point.clientX - rect.left,
          y: point.clientY - rect.top,
        };
      }

      function start(e) {
        e.preventDefault();
        drawing = true;
        last = pos(e);
        shell.classList.add("is-drawing", "has-ink");
        if (canvas.setPointerCapture) {
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch (_) {
            /* ignore */
          }
        }
      }

      function move(e) {
        if (!drawing) return;
        e.preventDefault();
        const p = pos(e);
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        last = p;
      }

      function end(e) {
        drawing = false;
        last = null;
        shell.classList.remove("is-drawing");
        if (e && canvas.releasePointerCapture) {
          try {
            canvas.releasePointerCapture(e.pointerId);
          } catch (_) {
            /* ignore */
          }
        }
      }

      canvas.addEventListener("pointerdown", start);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", end);
      canvas.addEventListener("pointercancel", end);

      clearBtn?.addEventListener("click", () => {
        const rect = canvas.getBoundingClientRect();
        drawGrid(rect.width, rect.height);
        shell.classList.remove("has-ink");
      });

      revealBtn?.addEventListener("click", () => {
        if (!answer) return;
        const open = answer.hasAttribute("hidden");
        if (open) {
          answer.removeAttribute("hidden");
          revealBtn.textContent = "إخفاء النتيجة";
          // ensure any late katex blocks inside are rendered
          answer.querySelectorAll("[data-katex]").forEach((el) => {
            if (el.dataset.rendered === "1" || !window.katex) return;
            katex.render(el.textContent.trim(), el, {
              throwOnError: false,
              displayMode: true,
            });
            el.dataset.rendered = "1";
          });
          answer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          answer.setAttribute("hidden", "");
          revealBtn.textContent = "عرض النتيجة";
        }
      });

      resize();
      window.addEventListener("resize", resize);
    });
  }

  function boot() {
    buildMatrixStream();
    setupScrollHelpers();
    setupReveal();
    setupTensorDemo();
    setupFlipDemo();
    setupSolver();
    renderBlockMath();
    renderInlineMath();
    setupPracticePads();
  }

  function whenKatexReady(cb) {
    if (window.katex) {
      cb();
      return;
    }
    let tries = 0;
    const t = setInterval(() => {
      tries += 1;
      if (window.katex || tries > 80) {
        clearInterval(t);
        cb();
      }
    }, 40);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => whenKatexReady(boot));
  } else {
    whenKatexReady(boot);
  }
})();
