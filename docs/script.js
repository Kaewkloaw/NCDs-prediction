// Global variables
let currentPatient = null;
let currentDoctor = null;
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;
let healthTrendsChart = null;
let forecastChart = null;

// DOM elements
const searchSection = document.getElementById('searchSection');
const dashboardSection = document.getElementById('dashboardSection');
const todayPatientsSection = document.getElementById('todayPatientsSection');
const dashboardQuickInfo = document.getElementById('dashboardQuickInfo');
const patientIdInput = document.getElementById('patientIdInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const homeBtn = document.getElementById('homeBtn');

// Doctor selector elements
const doctorSelect = document.getElementById('doctorSelect');
const viewTodayPatientsBtn = document.getElementById('viewTodayPatientsBtn');
const backToListBtn = document.getElementById('backToListBtn');

// Voice recording elements
const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingStatus = document.getElementById('recordingStatus');
const voiceNotesList = document.getElementById('voiceNotesList');

// Dashboard elements
const patientName = document.getElementById('patientName');
const patientId = document.getElementById('patientId');
const patientAge = document.getElementById('patientAge');
const patientGender = document.getElementById('patientGender');
const lastVisit = document.getElementById('lastVisit');
const doctorName = document.getElementById('doctorName');
const doctorDepartment = document.getElementById('doctorDepartment');
const doctorContact = document.getElementById('doctorContact');
const anomalyAlert = document.getElementById('anomalyAlert');

// Vital signs elements
const bloodPressure = document.getElementById('bloodPressure');
const heartRate = document.getElementById('heartRate');
const temperature = document.getElementById('temperature');
const weight = document.getElementById('weight');

// Lists
const anomalyList = document.getElementById('anomalyList');
const forecastsList = document.getElementById('forecastsList');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Search functionality
    searchBtn.addEventListener('click', searchPatient);
    patientIdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPatient();
        }
    });

    // Home button
    homeBtn.addEventListener('click', showSearchSection);

    // Doctor selector
    doctorSelect.addEventListener('change', handleDoctorSelection);
    viewTodayPatientsBtn.addEventListener('click', showTodayPatients);
    backToListBtn.addEventListener('click', backToPatientList);

    // Voice recording
    recordBtn.addEventListener('click', startRecording);
    stopBtn.addEventListener('click', stopRecording);

    // Doctor name click handler
    if (doctorName) {
        doctorName.addEventListener('click', handleDoctorNameClick);
    }

    // Show search section initially
    showSearchSection();
    
    // Load recent patients when page loads
    loadRecentPatients();
}

function showSearchSection() {
    searchSection.style.display = 'block';
    dashboardSection.style.display = 'none';
    todayPatientsSection.style.display = 'none';
    dashboardQuickInfo.style.display = 'none';
    currentPatient = null;
    currentDoctor = null;
    
    // Reset doctor selection
    doctorSelect.value = '';
    viewTodayPatientsBtn.style.display = 'none';
    backToListBtn.style.display = 'none';
    
    // Clear search
    patientIdInput.value = '';
    searchResults.innerHTML = '';
    
    // Reload recent patients
    loadRecentPatients();
}

function loadRecentPatients() {
    const tableBody = document.querySelector('#recentPatientsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    recentPatients.forEach(patient => {
        const patientData = patientsData[patient.id];
        if (!patientData) return;
        
        const row = document.createElement('tr');
        row.onclick = () => selectPatient(patient.id);
        
        row.innerHTML = `
            <td class="patient-id-cell">${patient.id}</td>
            <td class="patient-name-cell">${patient.name}</td>
            <td>${formatDate(patient.lastVisit)}</td>
            <td>
                <span class="status-badge status-${patient.urgency}">
                    ${patient.status}
                </span>
            </td>
            <td>${patient.doctor}</td>
            <td class="vital-cell">${patientData.vitals.bloodPressure}</td>
            <td class="vital-cell">${patientData.vitals.heartRate} bpm</td>
            <td>
                <button class="btn-view" onclick="event.stopPropagation(); selectPatient('${patient.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function handleDoctorSelection() {
    const selectedDoctorId = doctorSelect.value;
    if (selectedDoctorId) {
        currentDoctor = doctorsData[selectedDoctorId];
        viewTodayPatientsBtn.style.display = 'inline-flex';
        
        // Update doctor name in dashboard if dashboard is visible
        if (dashboardSection.style.display === 'block') {
            updateDoctorInfoInDashboard();
        }
    } else {
        currentDoctor = null;
        viewTodayPatientsBtn.style.display = 'none';
    }
}

function updateDoctorInfoInDashboard() {
    if (currentDoctor) {
        doctorName.textContent = currentDoctor.name;
        doctorDepartment.textContent = currentDoctor.department;
        doctorContact.textContent = currentDoctor.contact;
        
        // Update patient's current doctor data
        if (currentPatient) {
            currentPatient.currentDoctor = {
                name: currentDoctor.name,
                department: currentDoctor.department,
                contact: currentDoctor.contact
            };
        }
    }
}

function getDoctorIdByName(doctorName) {
    for (const [id, doctor] of Object.entries(doctorsData)) {
        if (doctor.name === doctorName) {
            return id;
        }
    }
    return null;
}

function handleDoctorNameClick() {
    if (currentPatient && currentPatient.currentDoctor) {
        const doctorId = getDoctorIdByName(currentPatient.currentDoctor.name);
        if (doctorId) {
            // Set the doctor in dropdown
            doctorSelect.value = doctorId;
            currentDoctor = doctorsData[doctorId];
            viewTodayPatientsBtn.style.display = 'inline-flex';
            
            // Go to today's patients page
            showTodayPatients();
        }
    }
}

function showTodayPatients() {
    if (!currentDoctor) return;
    
    searchSection.style.display = 'none';
    dashboardSection.style.display = 'none';
    todayPatientsSection.style.display = 'block';
    backToListBtn.style.display = 'none';
    
    loadTodayPatientsData();
}

function backToPatientList() {
    dashboardSection.style.display = 'none';
    todayPatientsSection.style.display = 'block';
    backToListBtn.style.display = 'none';
}

function loadTodayPatientsData() {
    if (!currentDoctor) return;
    
    // Update header
    document.getElementById('doctorTitle').textContent = `${currentDoctor.name} - Today's Patients`;
    document.getElementById('doctorDepartmentTitle').textContent = `${currentDoctor.department} Department`;
    
    // Get patients for this doctor
    const doctorPatients = currentDoctor.todayPatients.map(id => patientsData[id]).filter(p => p);
    
    // Update stats
    const totalPatients = doctorPatients.length;
    const anomalyPatients = doctorPatients.filter(p => p.anomalies && p.anomalies.length > 0).length;
    const pendingPatients = doctorPatients.filter(p => p.lastVisit === '2025-09-30').length;
    
    document.getElementById('totalPatientsCount').textContent = totalPatients;
    document.getElementById('anomalyPatientsCount').textContent = anomalyPatients;
    document.getElementById('pendingPatientsCount').textContent = pendingPatients;
    
    // Load patient cards
    loadPatientCards(doctorPatients);
}

function loadPatientCards(patients) {
    const container = document.getElementById('todayPatientsList');
    container.innerHTML = '';
    
    patients.forEach(patient => {
        const hasAnomaly = patient.anomalies && patient.anomalies.length > 0;
        const cardDiv = document.createElement('div');
        cardDiv.className = `patient-card ${hasAnomaly ? 'has-anomaly' : ''}`;
        cardDiv.onclick = () => selectPatientFromList(patient.id);
        
        cardDiv.innerHTML = `
            <div class="patient-card-header">
                <div class="patient-card-name">${patient.name}</div>
                <div class="patient-card-id">${patient.id}</div>
            </div>
            
            <div class="patient-card-vitals">
                <div class="vital-quick">BP: <strong>${patient.vitals.bloodPressure}</strong></div>
                <div class="vital-quick">HR: <strong>${patient.vitals.heartRate} bpm</strong></div>
                <div class="vital-quick">Temp: <strong>${patient.vitals.temperature}°F</strong></div>
                <div class="vital-quick">Weight: <strong>${patient.vitals.weight} kg</strong></div>
            </div>
            
            <div class="patient-card-status">
                <div class="status-badge ${hasAnomaly ? 'status-anomaly' : 'status-normal'}">
                    ${hasAnomaly ? 'Anomaly Detected' : 'Normal'}
                </div>
                <div class="last-visit">Visit: ${patient.lastVisit}</div>
            </div>
        `;
        
        container.appendChild(cardDiv);
    });
}

function selectPatientFromList(patientId) {
    currentPatient = patientsData[patientId];
    if (!currentPatient) return;
    
    // Update patient's doctor info to match selected doctor
    if (currentDoctor) {
        currentPatient.currentDoctor = {
            name: currentDoctor.name,
            department: currentDoctor.department,
            contact: currentDoctor.contact
        };
    }
    
    // Show dashboard
    todayPatientsSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    backToListBtn.style.display = 'inline-flex';
    
    // Load patient data
    loadPatientData();
}

function searchPatient() {
    const searchId = patientIdInput.value.trim().toUpperCase();
    
    if (!searchId) {
        showSearchResults([]);
        return;
    }

    // Search for patients
    const results = [];
    for (const [id, patient] of Object.entries(patientsData)) {
        if (id.includes(searchId) || patient.name.toLowerCase().includes(searchId.toLowerCase())) {
            results.push(patient);
        }
    }

    showSearchResults(results);
}

function showSearchResults(results) {
    searchResults.innerHTML = '';
    const recentPatientsSection = document.querySelector('.recent-patients-section');

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; color: #7f8c8d; margin-top: 20px;">No patients found. Try searching for P001, P002, or P003.</p>';
        // Show recent patients when no search results
        recentPatientsSection.style.display = 'block';
        return;
    }

    // Hide recent patients when showing search results
    recentPatientsSection.style.display = 'none';

    results.forEach(patient => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'patient-result';
        resultDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4>${patient.name}</h4>
                    <p style="color: #7f8c8d; margin: 5px 0;">ID: ${patient.id} | Age: ${patient.age} | Gender: ${patient.gender}</p>
                    <p style="color: #95a5a6; font-size: 14px;">Last Visit: ${patient.lastVisit}</p>
                    ${patient.currentDoctor ? `<p style="color: #27ae60; font-size: 13px; margin-top: 5px;"><i class="fas fa-user-md"></i> ${patient.currentDoctor.name} - ${patient.currentDoctor.department}</p>` : ''}
                </div>
                <button class="btn btn-primary" onclick="selectPatient('${patient.id}')">
                    View Dashboard
                </button>
            </div>
        `;
        searchResults.appendChild(resultDiv);
    });
}

function selectPatient(patientId) {
    currentPatient = patientsData[patientId];
    if (!currentPatient) {
        alert('Patient not found!');
        return;
    }

    // Show dashboard
    searchSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    dashboardQuickInfo.style.display = 'block';

    // Load patient data
    loadPatientData();
    updateDashboardQuickInfo();
}

function updateDashboardQuickInfo() {
    if (!currentPatient) return;
    
    // Update quick info in header
    document.getElementById('quickPatientName').textContent = currentPatient.name;
    document.getElementById('quickPatientId').textContent = currentPatient.id;
    document.getElementById('quickPatientDoctor').textContent = currentPatient.currentDoctor?.name || 'No doctor assigned';
    
    // Update vital signs
    document.getElementById('quickBloodPressure').textContent = currentPatient.vitals.bloodPressure;
    document.getElementById('quickHeartRate').textContent = `${currentPatient.vitals.heartRate} bpm`;
    document.getElementById('quickTemperature').textContent = `${currentPatient.vitals.temperature}°F`;
    document.getElementById('quickWeight').textContent = `${currentPatient.vitals.weight} kg`;
    
    // Check for anomalies and highlight
    const quickAnomalyAlert = document.getElementById('quickAnomalyAlert');
    const hasAnomalies = currentPatient.anomalies.length > 0;
    
    if (hasAnomalies) {
        quickAnomalyAlert.style.display = 'flex';
        // Add anomaly styling to quick vitals
        checkQuickVitalAnomalies();
    } else {
        quickAnomalyAlert.style.display = 'none';
    }
}

function checkQuickVitalAnomalies() {
    // Reset styling
    const quickVitals = ['quickBloodPressure', 'quickHeartRate', 'quickTemperature', 'quickWeight'];
    quickVitals.forEach(id => {
        const element = document.getElementById(id);
        element.classList.remove('anomaly');
    });

    // Apply anomaly styling based on detected anomalies
    currentPatient.anomalies.forEach(anomaly => {
        switch (anomaly.type) {
            case 'Hypertension':
            case 'Hypotension':
            case 'Blood Pressure Spike':
                document.getElementById('quickBloodPressure').classList.add('anomaly');
                break;
            case 'Tachycardia':
            case 'Bradycardia':
            case 'Elevated Heart Rate':
                document.getElementById('quickHeartRate').classList.add('anomaly');
                break;
            case 'Weight Gain':
            case 'Rapid Weight Change':
                document.getElementById('quickWeight').classList.add('anomaly');
                break;
        }
    });
}

function loadPatientData() {
    if (!currentPatient) return;

    // Update patient info
    patientName.textContent = currentPatient.name;
    patientId.textContent = `Patient ID: ${currentPatient.id}`;
    patientAge.textContent = `Age: ${currentPatient.age}`;
    patientGender.textContent = `Gender: ${currentPatient.gender}`;
    lastVisit.textContent = `Last Visit: ${currentPatient.lastVisit}`;
    
    // Update doctor info
    if (currentPatient.currentDoctor) {
        doctorName.textContent = currentPatient.currentDoctor.name;
        doctorDepartment.textContent = currentPatient.currentDoctor.department;
        doctorContact.textContent = currentPatient.currentDoctor.contact;
    }
    
    // Update doctor dropdown to match current patient's doctor if not already selected
    if (!currentDoctor && currentPatient.currentDoctor) {
        const doctorId = getDoctorIdByName(currentPatient.currentDoctor.name);
        if (doctorId) {
            doctorSelect.value = doctorId;
            currentDoctor = doctorsData[doctorId];
            viewTodayPatientsBtn.style.display = 'inline-flex';
        }
    }

    // Update vital signs
    bloodPressure.textContent = currentPatient.vitals.bloodPressure;
    heartRate.textContent = `${currentPatient.vitals.heartRate} bpm`;
    temperature.textContent = `${currentPatient.vitals.temperature}°F`;
    weight.textContent = `${currentPatient.vitals.weight} kg`;

    // Check for anomalies and highlight vitals
    checkVitalAnomalies();

    // Load anomalies
    loadAnomalies();

    // Load forecasts
    loadForecasts();

    // Load voice notes
    loadVoiceNotes();

    // Load charts
    loadHealthTrendsChart();
    loadForecastChart();

    // Show anomaly alert if there are anomalies
    if (currentPatient.anomalies.length > 0) {
        anomalyAlert.style.display = 'flex';
    } else {
        anomalyAlert.style.display = 'none';
    }
}

function checkVitalAnomalies() {
    // Reset vital signs styling
    [bloodPressure, heartRate, temperature, weight].forEach(element => {
        element.classList.remove('anomaly');
    });

    currentPatient.anomalies.forEach(anomaly => {
        switch (anomaly.type) {
            case 'Hypertension':
            case 'Hypotension':
            case 'Blood Pressure Spike':
                bloodPressure.classList.add('anomaly');
                break;
            case 'Tachycardia':
            case 'Bradycardia':
            case 'Elevated Heart Rate':
                heartRate.classList.add('anomaly');
                break;
            case 'Weight Gain':
            case 'Rapid Weight Change':
                weight.classList.add('anomaly');
                break;
        }
    });
}

function loadAnomalies() {
    anomalyList.innerHTML = '';

    if (currentPatient.anomalies.length === 0) {
        anomalyList.innerHTML = '<p style="color: #27ae60; text-align: center;">No anomalies detected. Patient vitals are within normal ranges.</p>';
        return;
    }

    currentPatient.anomalies.forEach(anomaly => {
        const anomalyDiv = document.createElement('div');
        anomalyDiv.className = 'anomaly-item';
        anomalyDiv.innerHTML = `
            <div class="anomaly-title">${anomaly.type}</div>
            <div class="anomaly-description">${anomaly.description}</div>
            <span class="anomaly-severity severity-${anomaly.severity}">${anomaly.severity.toUpperCase()}</span>
            <div style="margin-top: 5px; font-size: 12px; color: #95a5a6;">Detected: ${anomaly.date}</div>
        `;
        anomalyList.appendChild(anomalyDiv);
    });
}

function loadForecasts() {
    forecastsList.innerHTML = '';

    if (currentPatient.forecasts.length === 0) {
        forecastsList.innerHTML = '<p style="color: #7f8c8d; text-align: center;">No forecasts available.</p>';
        return;
    }

    currentPatient.forecasts.forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-item';
        forecastDiv.innerHTML = `
            <div class="forecast-title">${forecast.type}</div>
            <div class="forecast-description">${forecast.description}</div>
            <div class="forecast-confidence">Confidence: ${forecast.confidence}</div>
            ${forecast.targetDate ? `<div style="margin-top: 5px; font-size: 12px; color: #95a5a6;">Target Date: ${forecast.targetDate}</div>` : ''}
        `;
        forecastsList.appendChild(forecastDiv);
    });
}

function loadVoiceNotes() {
    voiceNotesList.innerHTML = '';

    if (currentPatient.voiceNotes.length === 0) {
        voiceNotesList.innerHTML = '<p style="color: #7f8c8d; text-align: center; font-size: 14px;">No voice notes recorded.</p>';
        return;
    }

    currentPatient.voiceNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'voice-note';
        noteDiv.innerHTML = `
            <div class="voice-note-info">
                <div style="font-weight: 500;">${note.title}</div>
                <div class="voice-note-date">${note.date}</div>
                <div class="voice-note-duration">Duration: ${note.duration}</div>
            </div>
            <div class="voice-note-controls">
                <button class="btn btn-play" onclick="playVoiceNote('${note.id}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="btn btn-delete" onclick="deleteVoiceNote('${note.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        voiceNotesList.appendChild(noteDiv);
    });
}

function loadHealthTrendsChart() {
    const ctx = document.getElementById('healthTrendsChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (healthTrendsChart) {
        healthTrendsChart.destroy();
    }

    const dates = currentPatient.history.bloodPressure.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    healthTrendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Systolic BP',
                    data: currentPatient.history.bloodPressure.map(item => item.systolic),
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Diastolic BP',
                    data: currentPatient.history.bloodPressure.map(item => item.diastolic),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Heart Rate',
                    data: currentPatient.history.heartRate.map(item => item.value),
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Blood Pressure (mmHg)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Heart Rate (bpm)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Health Trends Over Time'
                }
            }
        }
    });
}

function loadForecastChart() {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (forecastChart) {
        forecastChart.destroy();
    }

    // Generate weight forecast data
    const currentWeight = currentPatient.vitals.weight;
    const forecastData = [];
    const labels = [];
    
    // Current weight
    forecastData.push(currentWeight);
    labels.push('Current');
    
    // Generate 6 months of forecast
    for (let i = 1; i <= 6; i++) {
        // Simple trend calculation (you can make this more sophisticated)
        const trend = -0.2; // Assume slight weight loss trend
        const forecast = currentWeight + (trend * i);
        forecastData.push(forecast);
        labels.push(`Month ${i}`);
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Weight Forecast (kg)',
                    data: forecastData,
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointBackgroundColor: function(context) {
                        return context.dataIndex === 0 ? '#e74c3c' : '#9b59b6';
                    },
                    pointRadius: function(context) {
                        return context.dataIndex === 0 ? 6 : 4;
                    }
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Weight (kg)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Weight Forecast (Next 6 Months)'
                }
            }
        }
    });
}

// Voice recording functions
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = function() {
            const blob = new Blob(recordedChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(blob);
            saveVoiceNote(audioUrl);
        };

        mediaRecorder.start();
        isRecording = true;
        
        recordBtn.style.display = 'none';
        stopBtn.style.display = 'inline-flex';
        recordBtn.classList.add('recording');
        recordingStatus.textContent = 'Recording...';

    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access microphone. Please check your permissions.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        isRecording = false;
        recordBtn.style.display = 'inline-flex';
        stopBtn.style.display = 'none';
        recordBtn.classList.remove('recording');
        recordingStatus.textContent = '';
    }
}

function saveVoiceNote(audioUrl) {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const duration = '00:30'; // You would calculate actual duration
    const id = 'vn' + Date.now();
    
    const newNote = {
        id: id,
        date: date,
        duration: duration,
        title: `Voice note - ${now.toLocaleTimeString()}`,
        url: audioUrl
    };

    if (!currentPatient.voiceNotes) {
        currentPatient.voiceNotes = [];
    }
    
    currentPatient.voiceNotes.unshift(newNote);
    loadVoiceNotes();
}

function playVoiceNote(noteId) {
    const note = currentPatient.voiceNotes.find(n => n.id === noteId);
    if (note && note.url) {
        const audio = new Audio(note.url);
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
            alert('Unable to play voice note.');
        });
    } else {
        alert('This is a demo voice note. Audio playback not available.');
    }
}

function deleteVoiceNote(noteId) {
    if (confirm('Are you sure you want to delete this voice note?')) {
        currentPatient.voiceNotes = currentPatient.voiceNotes.filter(n => n.id !== noteId);
        loadVoiceNotes();
    }
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Auto-search suggestions
patientIdInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    if (value.length > 0) {
        searchPatient();
    } else {
        searchResults.innerHTML = '';
        // Show recent patients when search is cleared
        const recentPatientsSection = document.querySelector('.recent-patients-section');
        recentPatientsSection.style.display = 'block';
    }
});
