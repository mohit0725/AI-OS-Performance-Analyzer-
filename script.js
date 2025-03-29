let processes = [];

function addProcess() {
  const pid = document.getElementById("pid").value;
  const cpu = parseInt(document.getElementById("cpu").value);
  const memory = parseInt(document.getElementById("memory").value);
  const execTime = parseInt(document.getElementById("execTime").value);

  if (pid && !isNaN(cpu) && !isNaN(memory) && !isNaN(execTime)) {
    processes.push({ pid, cpu, memory, execTime });
    updateProcessTable();
    clearInputFields();
  } else {
    alert("Please enter valid process details.");
  }
}

function clearInputFields() {
  document.getElementById("pid").value = "";
  document.getElementById("cpu").value = "";
  document.getElementById("memory").value = "";
  document.getElementById("execTime").value = "";
}

function updateProcessTable() {
  const tableBody = document.getElementById("processTable").querySelector("tbody");
  tableBody.innerHTML = "";
  processes.forEach(proc => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${proc.pid}</td>
      <td>${proc.cpu}</td>
      <td>${proc.memory}</td>
      <td>${proc.execTime}</td>
    `;
    tableBody.appendChild(row);
  });
}

function analyzePerformance() {
  if (processes.length === 0) {
    alert("Please add at least one process to analyze.");
    return;
  }

  // Simulated AI analysis
  const analysisResults = analyzeWithAI();
  displayPerformanceChart(analysisResults);
  displayPerformanceMetrics(analysisResults);
}

function analyzeWithAI() {
  const suggestions = [];
  processes.forEach(proc => {
    if (proc.cpu > 80) {
      suggestions.push(`${proc.pid}: High CPU usage detected. Consider reducing priority or optimizing code.`);
    }
    if (proc.memory > 512) {
      suggestions.push(`${proc.pid}: High memory usage. Increase allocation or optimize memory usage.`);
    }
    if (proc.execTime > 1000) {
      suggestions.push(`${proc.pid}: Long execution time. Investigate for bottlenecks.`);
    }
  });
  return { processes, suggestions };
}

function displayPerformanceChart(data) {
  const chart = document.getElementById("performanceChart");
  chart.innerHTML = "";
  data.processes.forEach((proc, index) => {
    setTimeout(() => {
      const bar = document.createElement("div");
      bar.classList.add("process-bar");
      bar.setAttribute("data-pid", proc.pid);
      bar.innerText = `${proc.pid}\nCPU: ${proc.cpu}%`;
      bar.style.width = "50px"; // Fixed width for simplicity
      bar.style.height = `${proc.cpu * 0.8}px`; // Height based on CPU usage
      chart.appendChild(bar);
    }, index * 500); // Animation delay
  });
}

function displayPerformanceMetrics(data) {
  const avgCpu = data.processes.reduce((sum, p) => sum + p.cpu, 0) / data.processes.length;
  const avgMemory = data.processes.reduce((sum, p) => sum + p.memory, 0) / data.processes.length;
  const suggestionsText = data.suggestions.length > 0 ? data.suggestions.join("\n") : "No optimization needed.";

  document.getElementById("avgCpuUsage").innerText = `Average CPU Usage: ${avgCpu.toFixed(2)}%`;
  document.getElementById("avgMemoryUsage").innerText = `Average Memory Usage: ${avgMemory.toFixed(2)} MB`;
  document.getElementById("optimizationSuggestions").innerText = `Optimization Suggestions:\n${suggestionsText}`;
}

function clearAllProcesses() {
  processes = [];
  updateProcessTable();
  document.getElementById("performanceChart").innerHTML = "";
  document.getElementById("avgCpuUsage").innerText = "Average CPU Usage: N/A";
  document.getElementById("avgMemoryUsage").innerText = "Average Memory Usage: N/A";
  document.getElementById("optimizationSuggestions").innerText = "Optimization Suggestions: N/A";
}
