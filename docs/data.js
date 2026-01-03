// Doctors and their patients for today
const doctorsData = {
    'sarah-wilson': {
        id: 'sarah-wilson',
        name: 'Dr. Sarah Wilson',
        department: 'Internal Medicine',
        contact: 'ext. 2101',
        todayPatients: ['P001', 'P004', 'P007']
    },
    'michael-chen': {
        id: 'michael-chen',
        name: 'Dr. Michael Chen',
        department: 'Family Medicine',
        contact: 'ext. 2205',
        todayPatients: ['P002', 'P005']
    },
    'emily-rodriguez': {
        id: 'emily-rodriguez',
        name: 'Dr. Emily Rodriguez',
        department: 'Cardiology',
        contact: 'ext. 2350',
        todayPatients: ['P003', 'P006', 'P008', 'P009']
    }
};

// Recent patients for quick access
const recentPatients = [
    {
        id: 'P003',
        name: 'Robert Johnson',
        lastVisit: '2025-09-29',
        status: 'High Risk',
        urgency: 'high',
        doctor: 'Dr. Emily Rodriguez'
    },
    {
        id: 'P002', 
        name: 'Jane Smith',
        lastVisit: '2025-09-28',
        status: 'Stable',
        urgency: 'low',
        doctor: 'Dr. Michael Chen'
    },
    {
        id: 'P006',
        name: 'Lisa Anderson', 
        lastVisit: '2025-09-30',
        status: 'Monitoring',
        urgency: 'medium',
        doctor: 'Dr. Emily Rodriguez'
    },
    {
        id: 'P001',
        name: 'John Doe',
        lastVisit: '2025-09-25',
        status: 'Stable',
        urgency: 'low',
        doctor: 'Dr. Sarah Wilson'
    },
    {
        id: 'P005',
        name: 'David Kim',
        lastVisit: '2025-09-30',
        status: 'Normal',
        urgency: 'low',
        doctor: 'Dr. Michael Chen'
    },
    {
        id: 'P004',
        name: 'Maria Garcia',
        lastVisit: '2025-09-30',
        status: 'Normal',
        urgency: 'low',
        doctor: 'Dr. Sarah Wilson'
    }
];

// Sample patient data
const patientsData = {
    'P001': {
        id: 'P001',
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        lastVisit: '2025-09-25',
        currentDoctor: {
            name: 'Dr. Sarah Wilson',
            department: 'Internal Medicine',
            contact: 'ext. 2101'
        },
        vitals: {
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 98.6,
            weight: 70
        },
        history: {
            bloodPressure: [
                { date: '2025-09-01', systolic: 118, diastolic: 78 },
                { date: '2025-09-05', systolic: 122, diastolic: 82 },
                { date: '2025-09-10', systolic: 120, diastolic: 80 },
                { date: '2025-09-15', systolic: 125, diastolic: 85 },
                { date: '2025-09-20', systolic: 119, diastolic: 79 },
                { date: '2025-09-25', systolic: 120, diastolic: 80 }
            ],
            heartRate: [
                { date: '2025-09-01', value: 70 },
                { date: '2025-09-05', value: 75 },
                { date: '2025-09-10', value: 72 },
                { date: '2025-09-15', value: 78 },
                { date: '2025-09-20', value: 71 },
                { date: '2025-09-25', value: 72 }
            ],
            weight: [
                { date: '2025-09-01', value: 71.2 },
                { date: '2025-09-05', value: 70.8 },
                { date: '2025-09-10', value: 70.5 },
                { date: '2025-09-15', value: 70.2 },
                { date: '2025-09-20', value: 70.0 },
                { date: '2025-09-25', value: 70.0 }
            ]
        },
        anomalies: [
            {
                type: 'Blood Pressure Spike',
                description: 'Systolic pressure reached 125 mmHg on 2025-09-15, above normal range',
                severity: 'medium',
                date: '2025-09-15'
            }
        ],
        forecasts: [
            {
                type: 'Weight Trend',
                description: 'Based on current trend, patient may reach target weight of 68kg in 3 months',
                confidence: 'High (85%)',
                targetDate: '2025-12-25'
            },
            {
                type: 'Blood Pressure',
                description: 'Blood pressure likely to remain stable with current medication',
                confidence: 'Medium (72%)',
                targetDate: '2025-10-30'
            }
        ],
        voiceNotes: [
            {
                id: 'vn1',
                date: '2025-09-25',
                duration: '00:45',
                title: 'Follow-up consultation notes',
                url: null // In real app, would store audio blob URL
            },
            {
                id: 'vn2',
                date: '2025-09-20',
                duration: '01:20',
                title: 'Treatment response discussion',
                url: null
            }
        ]
    },
    'P002': {
        id: 'P002',
        name: 'Jane Smith',
        age: 42,
        gender: 'Female',
        lastVisit: '2025-09-28',
        currentDoctor: {
            name: 'Dr. Michael Chen',
            department: 'Family Medicine',
            contact: 'ext. 2205'
        },
        vitals: {
            bloodPressure: '110/70',
            heartRate: 68,
            temperature: 98.2,
            weight: 65
        },
        history: {
            bloodPressure: [
                { date: '2025-09-01', systolic: 108, diastolic: 68 },
                { date: '2025-09-05', systolic: 112, diastolic: 72 },
                { date: '2025-09-10', systolic: 110, diastolic: 70 },
                { date: '2025-09-15', systolic: 109, diastolic: 69 },
                { date: '2025-09-20', systolic: 111, diastolic: 71 },
                { date: '2025-09-28', systolic: 110, diastolic: 70 }
            ],
            heartRate: [
                { date: '2025-09-01', value: 66 },
                { date: '2025-09-05', value: 69 },
                { date: '2025-09-10', value: 68 },
                { date: '2025-09-15', value: 67 },
                { date: '2025-09-20', value: 70 },
                { date: '2025-09-28', value: 68 }
            ],
            weight: [
                { date: '2025-09-01', value: 66.2 },
                { date: '2025-09-05', value: 65.8 },
                { date: '2025-09-10', value: 65.5 },
                { date: '2025-09-15', value: 65.3 },
                { date: '2025-09-20', value: 65.1 },
                { date: '2025-09-28', value: 65.0 }
            ]
        },
        anomalies: [],
        forecasts: [
            {
                type: 'Overall Health',
                description: 'Excellent health trajectory, all metrics within optimal ranges',
                confidence: 'Very High (92%)',
                targetDate: '2025-12-28'
            }
        ],
        voiceNotes: [
            {
                id: 'vn3',
                date: '2025-09-28',
                duration: '00:30',
                title: 'Routine checkup notes',
                url: null
            }
        ]
    },
    'P003': {
        id: 'P003',
        name: 'Robert Johnson',
        age: 58,
        gender: 'Male',
        lastVisit: '2025-09-29',
        currentDoctor: {
            name: 'Dr. Emily Rodriguez',
            department: 'Cardiology',
            contact: 'ext. 2350'
        },
        vitals: {
            bloodPressure: '145/95',
            heartRate: 88,
            temperature: 99.1,
            weight: 85
        },
        history: {
            bloodPressure: [
                { date: '2025-09-01', systolic: 138, diastolic: 88 },
                { date: '2025-09-05', systolic: 142, diastolic: 92 },
                { date: '2025-09-10', systolic: 140, diastolic: 90 },
                { date: '2025-09-15', systolic: 144, diastolic: 94 },
                { date: '2025-09-20', systolic: 146, diastolic: 96 },
                { date: '2025-09-29', systolic: 145, diastolic: 95 }
            ],
            heartRate: [
                { date: '2025-09-01', value: 82 },
                { date: '2025-09-05', value: 85 },
                { date: '2025-09-10', value: 84 },
                { date: '2025-09-15', value: 87 },
                { date: '2025-09-20', value: 89 },
                { date: '2025-09-29', value: 88 }
            ],
            weight: [
                { date: '2025-09-01', value: 83.5 },
                { date: '2025-09-05', value: 84.1 },
                { date: '2025-09-10', value: 84.3 },
                { date: '2025-09-15', value: 84.7 },
                { date: '2025-09-20', value: 84.9 },
                { date: '2025-09-29', value: 85.0 }
            ]
        },
        anomalies: [
            {
                type: 'Hypertension',
                description: 'Blood pressure consistently above 140/90 mmHg - requires immediate attention',
                severity: 'high',
                date: '2025-09-29'
            },
            {
                type: 'Elevated Heart Rate',
                description: 'Resting heart rate elevated above normal range',
                severity: 'medium',
                date: '2025-09-29'
            },
            {
                type: 'Weight Gain',
                description: 'Steady weight increase over the past month',
                severity: 'low',
                date: '2025-09-29'
            }
        ],
        forecasts: [
            {
                type: 'Cardiovascular Risk',
                description: 'High risk for cardiovascular events if current trends continue',
                confidence: 'High (88%)',
                targetDate: '2025-10-29'
            },
            {
                type: 'Medication Adjustment',
                description: 'May require antihypertensive medication adjustment within 2 weeks',
                confidence: 'Very High (95%)',
                targetDate: '2025-10-15'
            }
        ],
        voiceNotes: [
            {
                id: 'vn4',
                date: '2025-09-29',
                duration: '02:15',
                title: 'Hypertension management discussion',
                url: null
            },
            {
                id: 'vn5',
                date: '2025-09-25',
                duration: '01:30',
                title: 'Lifestyle modification recommendations',
                url: null
            }
        ]
    },
    'P004': {
        id: 'P004',
        name: 'Maria Garcia',
        age: 28,
        gender: 'Female',
        lastVisit: '2025-09-30',
        currentDoctor: {
            name: 'Dr. Sarah Wilson',
            department: 'Internal Medicine',
            contact: 'ext. 2101'
        },
        vitals: {
            bloodPressure: '115/75',
            heartRate: 68,
            temperature: 98.4,
            weight: 62
        },
        history: { bloodPressure: [], heartRate: [], weight: [] },
        anomalies: [],
        forecasts: [],
        voiceNotes: []
    },
    'P005': {
        id: 'P005',
        name: 'David Kim',
        age: 45,
        gender: 'Male',
        lastVisit: '2025-09-30',
        currentDoctor: {
            name: 'Dr. Michael Chen',
            department: 'Family Medicine',
            contact: 'ext. 2205'
        },
        vitals: {
            bloodPressure: '128/82',
            heartRate: 75,
            temperature: 98.8,
            weight: 78
        },
        history: { bloodPressure: [], heartRate: [], weight: [] },
        anomalies: [],
        forecasts: [],
        voiceNotes: []
    },
    'P006': {
        id: 'P006',
        name: 'Lisa Anderson',
        age: 39,
        gender: 'Female',
        lastVisit: '2025-09-30',
        currentDoctor: {
            name: 'Dr. Emily Rodriguez',
            department: 'Cardiology',
            contact: 'ext. 2350'
        },
        vitals: {
            bloodPressure: '135/88',
            heartRate: 82,
            temperature: 99.0,
            weight: 68
        },
        history: { bloodPressure: [], heartRate: [], weight: [] },
        anomalies: [
            {
                type: 'Mild Hypertension',
                description: 'Blood pressure slightly elevated',
                severity: 'low',
                date: '2025-09-30'
            }
        ],
        forecasts: [],
        voiceNotes: []
    }
};

// Anomaly detection algorithms
const anomalyDetection = {
    detectBloodPressureAnomalies: (history) => {
        const anomalies = [];
        const latest = history[history.length - 1];
        
        if (latest.systolic > 140 || latest.diastolic > 90) {
            anomalies.push({
                type: 'Hypertension',
                description: `Blood pressure ${latest.systolic}/${latest.diastolic} mmHg exceeds normal range`,
                severity: latest.systolic > 160 ? 'high' : 'medium',
                date: latest.date
            });
        }
        
        if (latest.systolic < 90 || latest.diastolic < 60) {
            anomalies.push({
                type: 'Hypotension',
                description: `Blood pressure ${latest.systolic}/${latest.diastolic} mmHg below normal range`,
                severity: 'medium',
                date: latest.date
            });
        }
        
        return anomalies;
    },
    
    detectHeartRateAnomalies: (history) => {
        const anomalies = [];
        const latest = history[history.length - 1];
        
        if (latest.value > 100) {
            anomalies.push({
                type: 'Tachycardia',
                description: `Heart rate ${latest.value} bpm above normal range`,
                severity: latest.value > 120 ? 'high' : 'medium',
                date: latest.date
            });
        }
        
        if (latest.value < 60) {
            anomalies.push({
                type: 'Bradycardia',
                description: `Heart rate ${latest.value} bpm below normal range`,
                severity: 'medium',
                date: latest.date
            });
        }
        
        return anomalies;
    },
    
    detectWeightAnomalies: (history) => {
        const anomalies = [];
        if (history.length < 2) return anomalies;
        
        const latest = history[history.length - 1];
        const previous = history[history.length - 2];
        const change = latest.value - previous.value;
        const changePercent = Math.abs(change / previous.value) * 100;
        
        if (changePercent > 5) {
            anomalies.push({
                type: 'Rapid Weight Change',
                description: `${change > 0 ? 'Gained' : 'Lost'} ${Math.abs(change).toFixed(1)}kg rapidly`,
                severity: changePercent > 10 ? 'high' : 'medium',
                date: latest.date
            });
        }
        
        return anomalies;
    }
};

// Forecasting algorithms
const forecasting = {
    generateWeightForecast: (history) => {
        if (history.length < 3) return null;
        
        // Simple linear regression for trend
        const n = history.length;
        const sumX = history.reduce((sum, _, i) => sum + i, 0);
        const sumY = history.reduce((sum, item) => sum + item.value, 0);
        const sumXY = history.reduce((sum, item, i) => sum + i * item.value, 0);
        const sumXX = history.reduce((sum, _, i) => sum + i * i, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        
        if (Math.abs(slope) > 0.1) {
            const direction = slope > 0 ? 'increase' : 'decrease';
            const monthlyChange = Math.abs(slope * 30).toFixed(1);
            
            return {
                type: 'Weight Trend',
                description: `Based on current trend, expect ${direction} of ~${monthlyChange}kg per month`,
                confidence: 'Medium (75%)',
                targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
        }
        
        return {
            type: 'Weight Stability',
            description: 'Weight appears stable based on current trend',
            confidence: 'High (85%)',
            targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
    },
    
    generateBloodPressureForecast: (history, currentMedication = false) => {
        if (history.length < 3) return null;
        
        const avgSystolic = history.reduce((sum, item) => sum + item.systolic, 0) / history.length;
        const avgDiastolic = history.reduce((sum, item) => sum + item.diastolic, 0) / history.length;
        
        if (avgSystolic > 140 || avgDiastolic > 90) {
            return {
                type: 'Hypertension Management',
                description: 'Recommend medication review and lifestyle modifications',
                confidence: 'High (90%)',
                targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
        } else if (avgSystolic < 120 && avgDiastolic < 80) {
            return {
                type: 'Blood Pressure Maintenance',
                description: 'Continue current lifestyle to maintain optimal blood pressure',
                confidence: 'High (88%)',
                targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
        }
        
        return {
            type: 'Blood Pressure Monitoring',
            description: 'Regular monitoring recommended to maintain current levels',
            confidence: 'Medium (78%)',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
    }
};
