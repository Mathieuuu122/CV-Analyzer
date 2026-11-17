async function getMockData() {
  const res = await fetch("Analysis.json");
  return await res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  let data = { savedCVs: [], defaultAnalysis: { matchingSkills: [], missingRequirements: [], recommendations: [] } };
  try { data = await getMockData(); } catch (e) {}

  // 1. Login & Register
  const authForm = document.getElementById("login-form") || document.getElementById("register-form");
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "Dashbord.html";
    });
  }

  // 2. Dashboard
  const cvListEl = document.getElementById("dashboard-cv-list");
  if (cvListEl) {
    document.getElementById("stat-cv-count").textContent = data.savedCVs.length;
    cvListEl.innerHTML = data.savedCVs.map(cv => `
      <div class="card">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong>${cv.title}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">Updated ${cv.updatedAt}</span>
        </div>
        <p style="font-size:0.84rem; color:var(--text-secondary); margin-bottom:10px;">${cv.summary}</p>
        <div style="display:flex; gap:8px;">
          <a href="Analyze.html" class="btn btn-primary btn-sm">Analyze</a>
          <a href="Create.html" class="btn btn-outline btn-sm">Edit</a>
        </div>
      </div>`).join("");

    const a = data.defaultAnalysis;
    document.getElementById("dashboard-analysis-list").innerHTML = `
      <div class="card">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong>${a.jobTitle} — ${a.company}</strong>
          <span class="badge badge-green">${a.matchScore}% Match</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:10px;">CV used: ${a.cvTitle}</p>
        <a href="Result.html" class="btn btn-outline btn-sm">View Full Report &rarr;</a>
      </div>`;
  }

  // 3. Analyze CV
  const dropzone = document.getElementById("cv-dropzone");
  if (dropzone) {
    const selectEl = document.getElementById("existing-cv-select");
    data.savedCVs.forEach(cv => selectEl.add(new Option(`${cv.title} (Saved)`, cv.title)));

    const fileInput = document.getElementById("cv-file-input");
    document.getElementById("browse-cv-btn").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files[0]) document.getElementById("dropzone-filename").textContent = `Selected: ${e.target.files[0].name}`;
    });

    document.getElementById("run-analysis-btn").addEventListener("click", () => {
      window.location.href = "Result.html";
    });
  }

  // 4. Analysis Result
  const scoreBadge = document.getElementById("result-score-badge");
  if (scoreBadge) {
    const a = data.defaultAnalysis;
    document.getElementById("result-subtitle").textContent = `Comparing "${a.cvTitle}" against ${a.jobTitle} at ${a.company}`;
    scoreBadge.textContent = `${a.matchScore}% Match Score`;
    document.getElementById("result-matching-skills").innerHTML = a.matchingSkills.map(s => `<span class="badge badge-green">${s}</span>`).join("");
    document.getElementById("result-missing-skills").innerHTML = a.missingRequirements.map(s => `<span class="badge badge-yellow">${s}</span>`).join("");
    document.getElementById("result-recommendations").innerHTML = a.recommendations.map(r => `<li>${r}</li>`).join("");
    document.getElementById("result-improved-summary").textContent = a.improvedSummary;

    const approveBtn = document.getElementById("approve-improvement-btn");
    approveBtn.addEventListener("click", () => {
      approveBtn.textContent = "✓ Approved & Saved";
      approveBtn.classList.replace("btn-primary", "btn-dark");
    });
  }

  // 5. Create CV Builder
  if (document.getElementById("cv-builder-form")) {
    const skillInput = document.getElementById("skill-input");
    const addSkill = () => {
      if (!skillInput.value.trim()) return;
      document.getElementById("skills-tag-list").insertAdjacentHTML("beforeend", `<span class="badge badge-blue">${skillInput.value.trim()}</span>`);
      skillInput.value = "";
    };
    document.getElementById("add-skill-btn").addEventListener("click", addSkill);
    skillInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } });

    [["add-education-btn", "education-list", ".education-row"],
     ["add-experience-btn", "experience-list", ".experience-row"],
     ["add-project-btn", "projects-list", ".project-row"]].forEach(([btn, list, row]) => {
      document.getElementById(btn).addEventListener("click", () => {
        const clone = document.querySelector(row).cloneNode(true);
        clone.querySelectorAll("input").forEach(i => i.value = "");
        document.getElementById(list).appendChild(clone);
      });
    });

    document.getElementById("add-language-btn").addEventListener("click", () => {
      const languagesList = document.getElementById("languages-list");
      const languageField = languagesList.querySelector(".form-group");
      const proficiencyField = languageField.nextElementSibling;
      languagesList.append(languageField.cloneNode(true), proficiencyField.cloneNode(true));
    });

    document.getElementById("save-draft-btn").addEventListener("click", () => {
      document.getElementById("draft-status").textContent = "Saved just now";
    });
    document.getElementById("save-continue-btn").addEventListener("click", () => window.location.href = "Analyze.html");

    const modal = document.getElementById("cv-preview-modal");
    document.getElementById("preview-cv-btn").addEventListener("click", () => {
      const name = document.getElementById("cv-fullname").value || "Your Name";
      const email = document.getElementById("cv-email").value || "email@example.com";
      document.getElementById("cv-preview-content").innerHTML = `<h3>${name}</h3><p style="color:var(--text-muted);">${email}</p>`;
      modal.classList.add("open");
    });
    document.getElementById("close-preview-btn").addEventListener("click", () => modal.classList.remove("open"));
  }
});