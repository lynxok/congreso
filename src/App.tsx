/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  Database, 
  Calculator, 
  Settings, 
  User, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Search,
  Bell,
  Users,
  TrendingUp,
  Plus,
  Check,
  CheckCircle,
  Info,
  TrendingDown,
  DollarSign,
  HeartPulse,
  Brain,
  Rocket,
  History,
  Bed,
  FileText,
  X,
  FlaskConical,
  Eye,
  Download,
  Save,
  Activity as ActivityIcon,
  Brain as BrainIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg", zIndex = "z-50" }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, maxWidth?: string, zIndex?: string }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={cn("fixed inset-0 flex items-center justify-center p-4", zIndex)}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={cn("glass-panel w-full p-8 relative z-10 shadow-2xl rounded-xl flex flex-col max-h-full overflow-hidden", maxWidth)}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 text-tertiary">
              <h3 className="text-xl font-headline font-bold text-on-background uppercase tracking-tight">{title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-on-surface-variant group">
              <X size={20} className="group-hover:text-on-surface" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PatientListModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const patients = [
    { name: "Ricardo Mendoza Flores", id: "4892-XP", risk: 78, level: "Alto", status: "Pendiente", date: "12 Oct, 2023" },
    { name: "Elena Sofia Vargas", id: "3310-LT", risk: 34, level: "Bajo", status: "Optimizado", date: "14 Oct, 2023" },
    { name: "Carlos Arturo Jiménez", id: "9021-QA", risk: 52, level: "Medio", status: "Recuperación", date: "15 Oct, 2023" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lista de Pacientes" maxWidth="max-w-5xl">
      <div className="flex flex-col gap-6">
        {/* Modal Filters Bar */}
        <div className="p-6 bg-surface-container-low/50 flex flex-wrap gap-4 items-center border-b border-white/5 -mx-8 -mt-2">
          {/* Search */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant size-5" />
            <input 
              className="w-full bg-surface-container-low border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-on-surface focus:outline-none focus:border-tertiary transition-all placeholder:text-on-surface-variant/50" 
              placeholder="Buscar por nombre o ID..." 
              type="text"
            />
          </div>
          {/* Filter: Risk */}
          <div className="flex items-center gap-2">
            <span className="font-label text-on-surface-variant">Nivel de Riesgo</span>
            <div className="flex p-1 bg-surface-container-low rounded-lg border border-white/5">
              <button className="px-3 py-1.5 rounded font-label text-[10px] bg-primary-container text-primary">Todos</button>
              <button className="px-3 py-1.5 rounded font-label text-[10px] text-error hover:bg-white/5">Alto</button>
              <button className="px-3 py-1.5 rounded font-label text-[10px] text-secondary hover:bg-white/5">Bajo</button>
              <button className="px-3 py-1.5 rounded font-label text-[10px] text-tertiary hover:bg-white/5">Medio</button>
            </div>
          </div>
          {/* Filter: Status */}
          <div className="flex items-center gap-2">
            <span className="font-label text-on-surface-variant">Estado</span>
            <select className="bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 text-on-surface font-label text-[10px] uppercase focus:outline-none focus:border-tertiary">
              <option>Pendiente</option>
              <option>Optimizado</option>
              <option>En Recuperación</option>
            </select>
          </div>
        </div>

        {/* Modal Body: Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-on-surface-variant">
                <th className="px-4 py-2 font-label">Paciente / ID</th>
                <th className="px-4 py-2 font-label">Índice de Riesgo</th>
                <th className="px-4 py-2 font-label">Estado Clínico</th>
                <th className="px-4 py-2 font-label">Última Evaluación</th>
                <th className="px-4 py-2 font-label text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="bg-surface-container-high/40 hover:bg-surface-container-high/60 transition-colors group">
                  <td className="px-4 py-4 rounded-l-lg border-y border-l border-white/5">
                    <div className="font-bold text-on-surface">{p.name}</div>
                    <div className="font-mono text-[10px] text-on-surface-variant">ID: {p.id}</div>
                  </td>
                  <td className="px-4 py-4 border-y border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-surface-container-low rounded-full overflow-hidden">
                        <div className={cn("h-full", p.risk > 70 ? "bg-error" : p.risk > 40 ? "bg-tertiary" : "bg-secondary")} style={{ width: `${p.risk}%` }}></div>
                      </div>
                      <span className={cn("font-mono text-xs font-bold", p.risk > 70 ? "text-error" : p.risk > 40 ? "text-tertiary" : "text-secondary")}>{p.risk}%</span>
                      <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border", 
                        p.risk > 70 ? "bg-error/10 text-error border-error/20" : 
                        p.risk > 40 ? "bg-tertiary/10 text-tertiary border-tertiary/20" : 
                        "bg-secondary/10 text-secondary border-secondary/20"
                      )}>
                        {p.risk > 70 ? 'Alto' : p.risk > 40 ? 'Medio' : 'Bajo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-y border-white/5">
                    <span className="flex items-center gap-2 text-on-surface text-sm">
                      <span className={cn("w-2 h-2 rounded-full", p.status === 'Pendiente' ? "bg-error animate-pulse" : "bg-secondary")}></span>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-y border-white/5 text-on-surface-variant font-mono text-[11px]">
                    {p.date}
                  </td>
                  <td className="px-4 py-4 rounded-r-lg border-y border-r border-white/5 text-right">
                    <button className="bg-primary text-primary-container font-black px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider hover:bg-white transition-colors">
                      {p.status === 'Pendiente' ? 'Iniciar Evaluación' : 'Ver Perfil'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low border border-white/5 rounded-xl flex justify-between items-center -mx-8 -mb-8">
          <span className="text-xs text-on-surface-variant font-label">Mostrando 3 de 142 pacientes clínicos</span>
          <div className="flex gap-2">
            <button className="p-2 bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface disabled:opacity-50" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 bg-surface-container-high rounded-lg text-on-surface hover:bg-white/10">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Mock Data
const MOCK_TRAJECTORY = [
  { day: 0, crp: 12, risk: 20 },
  { day: 15, crp: 45, risk: 35 },
  { day: 30, crp: 68, risk: 55 },
  { day: 45, crp: 52, risk: 48 },
  { day: 60, crp: 89, risk: 72 },
  { day: 75, crp: 105, risk: 85 },
  { day: 90, crp: 112, risk: 92 },
];

const EIRI_SAMPLES = {
  crp: [12, 45, 68, 52, 89, 105, 112],
  nlr: [2.1, 2.5, 4.2, 3.8, 5.1, 6.2, 7.5],
  il6: [5, 12, 28, 22, 35, 48, 55],
};

interface ComorbidityProps {
  label: string;
  defaultChecked?: boolean;
}

const ComorbidityToggle: React.FC<ComorbidityProps> = ({ label, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label 
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border select-none group",
        checked 
          ? "bg-tertiary/10 border-tertiary/30 text-on-surface shadow-lg shadow-tertiary/5" 
          : "bg-surface-container-low border-white/5 text-on-surface-variant hover:border-white/20 hover:bg-surface-container-high"
      )}
      onClick={() => setChecked(!checked)}
    >
      <div className={cn(
        "w-5 h-5 rounded flex items-center justify-center transition-all border",
        checked ? "bg-tertiary border-tertiary" : "bg-white/5 border-on-surface-variant/30 group-hover:border-on-surface-variant"
      )}>
        {checked && <Check size={14} className="text-on-tertiary" strokeWidth={4} />}
      </div>
      <span className="text-sm font-medium tracking-tight">{label}</span>
    </label>
  );
};

interface Comorbidity {
  label: string;
  checked: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timeline' | 'eiri' | 'optimizer' | 'economics' | 'settings'>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState('Juan Pérez (72a, ATR)');
  const [aiConfig, setAiConfig] = useState({
    engine: 'Gemini 1.5 Pro',
    apiKey: '',
    endpoint: 'https://generativelanguage.googleapis.com',
    model: 'gemini-1.5-pro',
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: 'Eres un asistente experto en cirugía ortopédica y prevención de infecciones periprotésicas (PJI). Tu objetivo es analizar biomarcadores para optimizar pacientes pre-quirúrgicos.'
  });
  const [patientEconomics, setPatientEconomics] = useState<Record<string, any>>({
    'Juan Pérez (72a, ATR)': {
      pjiSurgery: 28500,
      pjiHospital: 32000,
      pjiAntibiotics: 12500,
      pjiMargin: 12000,
      itecHygiene: 150,
      itecNutrition: 450,
      itecDigital: 200,
      itecLogistics: 400
    }
  });

  const getPatientCosts = (patientName: string) => {
    return patientEconomics[patientName] || referenceCosts;
  };
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isPatientListOpen, setIsPatientListOpen] = useState(false);
  const [isAddMarkerModalOpen, setIsAddMarkerModalOpen] = useState(false);
  const [markerUnit, setMarkerUnit] = useState('mg/L');
  const [customUnit, setCustomUnit] = useState('');
  const [evaluationStep, setEvaluationStep] = useState(1);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [referenceCosts, setReferenceCosts] = useState({
    pjiSurgery: 28500,
    pjiHospital: 32000,
    pjiAntibiotics: 12500,
    pjiMargin: 12000,
    itecHygiene: 150,
    itecNutrition: 450,
    itecDigital: 200,
    itecLogistics: 400
  });

  const totalPJI = referenceCosts.pjiSurgery + referenceCosts.pjiHospital + referenceCosts.pjiAntibiotics + referenceCosts.pjiMargin;
  const totalITEC = referenceCosts.itecHygiene + referenceCosts.itecNutrition + referenceCosts.itecDigital + referenceCosts.itecLogistics;
  const [comorbidities, setComorbidities] = useState<Comorbidity[]>([
    { label: "Diabetes Mellitus", checked: false },
    { label: "Obesidad (IMC > 30)", checked: true },
    { label: "Artritis Reumatoide", checked: false },
    { label: "Inmunosupresión", checked: false },
    { label: "Malnutrición", checked: false },
    { label: "Anemia", checked: false },
  ]);
  const [newComorbidityInput, setNewComorbidityInput] = useState('');

  const handleAddComorbidity = () => {
    if (newComorbidityInput.trim()) {
      setComorbidities([...comorbidities, { label: newComorbidityInput.trim(), checked: false }]);
      setNewComorbidityInput('');
    }
  };

  return (
    <div className="flex h-screen font-sans text-on-background overflow-hidden relative bg-background">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col py-8 px-4 h-screen w-64 bg-surface-container-low border-r border-white/5 z-40">
        <div className="mb-10 px-2 flex flex-col gap-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-tertiary/10 rounded-lg flex items-center justify-center border border-tertiary/20">
               <Activity className="text-tertiary" size={24} />
             </div>
             <div>
               <h1 className="font-headline text-xl font-bold text-tertiary leading-none">PJI-SMART</h1>
               <p className="font-label text-on-surface-variant mt-1">Clinical AI Platform</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <button 
            onClick={() => setIsPatientListOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          >
            <Users size={18} />
            <span className="font-label">Lista de Pacientes</span>
          </button>
          
          <div className="h-px bg-white/5 my-2"></div>

          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<Activity size={18} />} 
            label="Panel de Control" 
          />
          <NavButton 
            active={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
            icon={<Clock size={18} />} 
            label="Línea de Tiempo" 
          />
          <NavButton 
            active={activeTab === 'eiri'} 
            onClick={() => setActiveTab('eiri')} 
            icon={<Database size={18} />} 
            label="Registro EIRI" 
          />
          <NavButton 
            active={activeTab === 'optimizer'} 
            onClick={() => setActiveTab('optimizer')} 
            icon={<Calculator size={18} />} 
            label="Optimizador" 
          />
          <NavButton 
            active={activeTab === 'economics'} 
            onClick={() => setActiveTab('economics')} 
            icon={<DollarSign size={18} />} 
            label="Economía" 
          />
          <NavButton 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<Settings size={18} />} 
            label="Ajustes" 
          />
        </nav>

        <button 
          onClick={() => setIsNewPatientOpen(true)}
          className="mt-4 mb-8 bg-tertiary text-on-tertiary font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-tertiary/10"
        >
          <Plus size={18} />
          <span className="font-label">Nueva Evaluación</span>
        </button>

        <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all rounded-lg">
            <Settings size={16} />
            <span className="font-label">Ajustes</span>
          </button>
          <div className="mt-6 px-2">
            <p className="text-[10px] text-on-surface-variant mb-2">Desarrollado por:</p>
            <div className="flex items-center gap-2 opacity-70">
              <div className="w-16 h-4 bg-white/10 rounded flex items-center justify-center font-black text-[8px] tracking-tighter text-on-surface-variant">LYNX</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-8 h-16 w-full bg-surface-container/80 backdrop-blur-xl border-b border-white/5 z-50">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="font-label text-on-surface-variant">
                {activeTab === 'dashboard' ? 'Centro de Operaciones' : activeTab === 'economics' ? 'Análisis Financiero' : 'Caso de Paciente'}
              </span>
              <span className="font-headline font-bold text-on-background tracking-tight">
                {activeTab === 'dashboard' ? 'ESTADÍSTICAS GLOBALES' : activeTab === 'economics' ? 'DESGLOSE DE AHORROS PROYECTADOS' : `${selectedPatient.toUpperCase()} #7299-ATR`}
              </span>
            </div>
            {activeTab !== 'dashboard' && activeTab !== 'economics' && (
              <>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-error-container/20 rounded-full border border-error/30">
                  <AlertTriangle className="text-error" size={14} />
                  <span className="text-error font-bold text-sm">72% Riesgo</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-primary hover:bg-surface-container-high rounded-full transition-colors relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface-container"></div>
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <span className="hidden md:block font-label text-on-surface">Dr. Martinez</span>
              <div className="w-8 h-8 rounded-full bg-primary-container border border-primary/20 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-8 relative bg-surface-dim custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DashboardView 
                key="dashboard" 
                setActiveTab={setActiveTab} 
                setSelectedPatient={setSelectedPatient}
                setIsPatientListOpen={setIsPatientListOpen}
              />
            )}
            {activeTab === 'timeline' && <TimelineView key="timeline" />}
            {activeTab === 'eiri' && (
              <EIRIView 
                key="eiri" 
                selectedPatient={selectedPatient}
                patientEconomics={patientEconomics}
                setPatientEconomics={setPatientEconomics}
                referenceCosts={referenceCosts}
                isDiagnosticModalOpen={isDiagnosticModalOpen}
                setIsDiagnosticModalOpen={setIsDiagnosticModalOpen}
              />
            )}
            {activeTab === 'optimizer' && <OptimizerView key="optimizer" />}
            {activeTab === 'economics' && (
              <EconomicsDashboardView 
                key="economics" 
                referenceCosts={referenceCosts}
                setReferenceCosts={setReferenceCosts}
                totalPJI={totalPJI}
                totalITEC={totalITEC}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsView 
                key="settings" 
                aiConfig={aiConfig} 
                setAiConfig={setAiConfig} 
              />
            )}
          </AnimatePresence>
        </div>

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsNewPatientOpen(true)}
          className="fixed bottom-8 right-8 bg-tertiary text-on-tertiary w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all z-40"
        >
          <Plus size={32} />
        </button>
      </main>

      {/* Modals */}
      <PatientListModal isOpen={isPatientListOpen} onClose={() => setIsPatientListOpen(false)} />
      
      <Modal 
        isOpen={isNewPatientOpen} 
        onClose={() => { setIsNewPatientOpen(false); setEvaluationStep(1); }} 
        title="Nueva Evaluación de Riesgo"
        maxWidth="max-w-4xl"
      >
        <div className="flex flex-col">
          {/* Subtitle */}
          <p className="font-label text-tertiary mb-6">SISTEMA DE APOYO A LA DECISIÓN CLÍNICA AI</p>

          {/* Stepper */}
          <div className="px-6 py-6 bg-surface-container/30 rounded-xl mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>
              <div className={cn(
                "absolute top-1/2 left-0 h-[1px] bg-tertiary -translate-y-1/2 z-0 transition-all duration-500",
                evaluationStep === 1 ? "w-0" : evaluationStep === 2 ? "w-1/2" : "w-full"
              )}></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-surface-container-lowest transition-colors",
                  evaluationStep >= 1 ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-on-surface-variant"
                )}>
                  {evaluationStep > 1 ? <Check size={18} /> : 1}
                </div>
                <span className={cn("font-label text-[10px] uppercase", evaluationStep >= 1 ? "text-tertiary" : "text-on-surface-variant")}>Datos del Paciente</span>
              </div>
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-surface-container-lowest transition-colors",
                  evaluationStep >= 2 ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-on-surface-variant"
                )}>
                  {evaluationStep > 2 ? <Check size={18} /> : 2}
                </div>
                <span className={cn("font-label text-[10px] uppercase", evaluationStep >= 2 ? "text-tertiary" : "text-on-surface-variant")}>Biomarcadores</span>
              </div>
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-surface-container-lowest transition-colors",
                  evaluationStep >= 3 ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-on-surface-variant"
                )}>3</div>
                <span className={cn("font-label text-[10px] uppercase", evaluationStep >= 3 ? "text-tertiary" : "text-on-surface-variant")}>Historial Clínico</span>
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); if(evaluationStep < 3) setEvaluationStep(s => s + 1); else setIsNewPatientOpen(false); }}>
            {evaluationStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                {/* Section: Identificación */}
                <div>
                  <h3 className="font-label text-primary mb-6 flex items-center gap-2">
                    <User size={18} />
                    IDENTIFICACIÓN Y CIRUGÍA
                  </h3>
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8">
                      <label className="font-label text-on-surface-variant block mb-2">Nombre Completo</label>
                      <input className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-tertiary transition-all placeholder:text-slate-600" placeholder="Ej. Juan Pérez García" type="text" />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <label className="font-label text-on-surface-variant block mb-2">ID Paciente / NHC</label>
                      <input className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-tertiary transition-all placeholder:text-slate-600" placeholder="000-000-000" type="text" />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label className="font-label text-on-surface-variant block mb-2">Edad</label>
                      <input className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-tertiary transition-all" placeholder="Años" type="number" />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label className="font-label text-on-surface-variant block mb-2">Género</label>
                      <select className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-tertiary transition-all appearance-none">
                        <option>Seleccionar</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="font-label text-on-surface-variant block mb-2">Tipo de Cirugía</label>
                      <select className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-tertiary transition-all appearance-none">
                        <option>Prótesis Total de Cadera (PTC)</option>
                        <option>Prótesis Total de Rodilla (PTR)</option>
                        <option>Revisión de Prótesis</option>
                        <option>Osteosíntesis</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section: Screening Inicial */}
                <div className="bg-tertiary/5 p-6 rounded-xl border border-tertiary/20">
                  <h3 className="font-label text-tertiary mb-4 flex items-center gap-2">
                    <Activity size={18} />
                    ENTRADAS RÁPIDAS (SCREENING INICIAL)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-container/50 p-4 rounded-lg border border-tertiary/10">
                      <label className="font-label text-on-surface-variant block mb-1">PCR (mg/L)</label>
                      <div className="flex items-center gap-3">
                        <input className="w-full bg-transparent border-none text-2xl font-headline font-bold text-on-surface focus:ring-0 p-0" placeholder="0.0" type="text" />
                        <Activity className="text-tertiary/30" size={20} />
                      </div>
                    </div>
                    <div className="bg-surface-container/50 p-4 rounded-lg border border-tertiary/10">
                      <label className="font-label text-on-surface-variant block mb-1">VSG (mm/h)</label>
                      <div className="flex items-center gap-3">
                        <input className="w-full bg-transparent border-none text-2xl font-headline font-bold text-on-surface focus:ring-0 p-0" placeholder="0" type="text" />
                        <TrendingUp className="text-tertiary/30" size={20} />
                      </div>
                    </div>
                    <div className="bg-surface-container/50 p-4 rounded-lg border border-tertiary/10">
                      <label className="font-label text-on-surface-variant block mb-1">Leucocitos (x10³/µL)</label>
                      <div className="flex items-center gap-3">
                        <input className="w-full bg-transparent border-none text-2xl font-headline font-bold text-on-surface focus:ring-0 p-0" placeholder="0.0" type="text" />
                        <Info className="text-tertiary/30" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {evaluationStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                {/* Marcadores Inflamatorios */}
                <section>
                  <div className="flex items-center gap-2 mb-6 border-l-4 border-secondary pl-4">
                    <h2 className="font-headline text-xl text-secondary">Marcadores Inflamatorios</h2>
                    <Activity className="text-secondary opacity-50" size={20} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">PCR (Proteína C Reactiva)</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: &lt; 5.0 mg/L</span>
                      </div>
                      <div className="relative group">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-16 text-on-surface transition-all placeholder:opacity-20" placeholder="0.0" step="0.1" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">mg/L</span>
                      </div>
                    </div>

                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">VSG (Velocidad de Sedimentación)</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: 0 - 20 mm/h</span>
                      </div>
                      <div className="relative">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-20 text-on-surface transition-all placeholder:opacity-20" placeholder="0" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">mm/h</span>
                      </div>
                    </div>

                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">Leucocitos (WBC)</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: 4.5 - 11.0 10³/µL</span>
                      </div>
                      <div className="relative">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-24 text-on-surface transition-all placeholder:opacity-20" placeholder="0.00" step="0.01" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">10³/µL</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setIsAddMarkerModalOpen(true)}
                      className="bg-surface-container p-4 rounded-xl border-2 border-dashed border-white/5 hover:border-secondary/50 hover:bg-white/5 transition-all group flex flex-col items-center justify-center gap-2 min-h-[120px]"
                    >
                      <Plus className="text-secondary opacity-50 group-hover:scale-110 transition-transform" />
                      <span className="font-label text-[10px] uppercase text-on-surface-variant group-hover:text-secondary transition-colors">+ Agregar marcador...</span>
                    </button>
                  </div>
                </section>

                {/* Metabolismo & Otros */}
                <section>
                  <div className="flex items-center gap-2 mb-6 border-l-4 border-tertiary pl-4">
                    <h2 className="font-headline text-xl text-tertiary">Metabolismo & Otros</h2>
                    <Activity className="text-tertiary opacity-50" size={20} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">Albúmina Sérica</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: 3.5 - 5.0 g/dL</span>
                      </div>
                      <div className="relative">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-16 text-on-surface transition-all placeholder:opacity-20" placeholder="0.0" step="0.1" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">g/dL</span>
                      </div>
                    </div>

                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">Glucemia en Ayunas</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: 70 - 100 mg/dL</span>
                      </div>
                      <div className="relative">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-16 text-on-surface transition-all placeholder:opacity-20" placeholder="0" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">mg/dL</span>
                      </div>
                    </div>

                    <div className="bg-surface-container p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant">Hemoglobina Glicosilada (HbA1c)</span>
                        <span className="text-[10px] font-label text-primary opacity-70">Ref: &lt; 5.7%</span>
                      </div>
                      <div className="relative">
                        <input className="w-full bg-surface-container-highest border-none focus:ring-1 focus:ring-tertiary rounded-lg text-2xl font-headline font-bold py-4 pr-12 text-on-surface transition-all placeholder:opacity-20" placeholder="0.0" step="0.1" type="number" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label text-xs text-on-surface-variant">%</span>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setIsAddMarkerModalOpen(true)}
                      className="bg-surface-container p-4 rounded-xl border-2 border-dashed border-white/5 hover:border-tertiary/50 hover:bg-white/5 transition-all group flex flex-col items-center justify-center gap-2 min-h-[120px]"
                    >
                      <Plus className="text-tertiary opacity-50 group-hover:scale-110 transition-transform" />
                      <span className="font-label text-[10px] uppercase text-on-surface-variant group-hover:text-tertiary transition-colors">+ Agregar marcador...</span>
                    </button>
                  </div>
                </section>
              </motion.div>
            )}

            {evaluationStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div className="grid grid-cols-12 gap-8">
                  {/* Comorbilidades */}
                  <div className="col-span-12 md:col-span-7 space-y-6">
                    <div className="flex items-center gap-2 border-l-4 border-tertiary pl-4">
                      <h2 className="font-headline text-xl text-tertiary">Comorbilidades</h2>
                      <HeartPulse className="text-tertiary opacity-50" size={20} />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {comorbidities.map((item: Comorbidity, index: number) => (
                        <ComorbidityToggle key={`${item.label}-${index}`} label={item.label} defaultChecked={item.checked} />
                      ))}
                      <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 border-dashed flex items-center gap-3 group focus-within:border-tertiary/50 transition-all">
                        <button 
                          type="button" 
                          onClick={handleAddComorbidity}
                          className="text-tertiary/50 group-hover:text-tertiary transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                        <input 
                          type="text" 
                          placeholder="Agregar otra..." 
                          value={newComorbidityInput}
                          onChange={(e) => setNewComorbidityInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddComorbidity();
                            }
                          }}
                          className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full placeholder:text-on-surface-variant/30" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Estilo de Vida */}
                  <div className="col-span-12 md:col-span-5 space-y-6">
                    <div className="flex items-center gap-2 border-l-4 border-secondary pl-4">
                      <h2 className="font-headline text-xl text-secondary">Estilo de Vida</h2>
                      <Activity className="text-secondary opacity-50" size={20} />
                    </div>

                    <div className="bg-surface-container-low/50 p-6 rounded-xl border border-white/5 space-y-6">
                      <div className="space-y-3">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Tabaquismo Activo</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button type="button" className="py-2.5 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 font-bold transition-all">No</button>
                          <button type="button" className="py-2.5 rounded-lg bg-secondary/20 border border-secondary text-secondary font-bold shadow-lg shadow-secondary/10">Sí</button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Consumo de Alcohol</span>
                        <select className="w-full bg-surface-container-high border-none rounded-lg p-3 text-on-surface text-sm focus:ring-2 focus:ring-tertiary transition-all appearance-none">
                          <option>Ocasional / Social</option>
                          <option>Moderado (1-2 día)</option>
                          <option>Elevado (&gt;2 día)</option>
                          <option>Abstinente</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Nivel Actividad Física</span>
                        <div className="grid grid-cols-4 gap-1">
                          {['Sed.', 'Leve', 'Mod.', 'Alto'].map((lvl) => (
                            <button key={lvl} type="button" className={cn(
                              "py-2 rounded border text-[9px] font-black uppercase transition-all",
                              lvl === 'Leve' ? "bg-secondary text-on-secondary border-secondary" : "border-white/10 text-on-surface-variant hover:bg-white/5"
                            )}>
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Antecedentes Quirúrgicos */}
                  <div className="col-span-12 space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-white/20 pl-4">
                      <h2 className="font-headline text-xl text-on-surface">Antecedentes Quirúrgicos</h2>
                      <History className="text-on-surface opacity-50" size={20} />
                    </div>
                    <div className="relative">
                      <textarea 
                        className="w-full h-32 bg-surface-container-high border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-tertiary transition-all resize-none" 
                        placeholder="Describa intervenciones previas, complicaciones perioperatorias o alergias..."
                      ></textarea>
                      <span className="absolute bottom-4 right-4 text-[10px] font-mono text-on-surface-variant/40">0 / 500</span>
                    </div>
                  </div>

                  {/* AI Insights Banner */}
                  <div className="col-span-12 bg-tertiary/10 border border-tertiary/20 rounded-xl p-6 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border-4 border-tertiary border-t-transparent animate-spin flex items-center justify-center shrink-0">
                      <Brain className="text-tertiary" size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-tertiary">Análisis Proyectivo en Curso</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        El motor de IA está procesando las comorbilidades. El factor de riesgo proyectado es moderado-alto. 
                        Finalice para ver el cálculo hemodinámico exacto.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-center gap-4 pt-4">
              <div className="flex gap-4">
                {evaluationStep > 1 && (
                  <button 
                    type="button"
                    onClick={() => setEvaluationStep(s => s - 1)}
                    className="px-6 py-2.5 rounded-lg border border-white/10 text-on-surface-variant font-medium hover:bg-white/5 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft size={20} />
                    Anterior
                  </button>
                )}
                <button 
                  type="button"
                  onClick={() => { setIsNewPatientOpen(false); setEvaluationStep(1); }}
                  className="px-6 py-2.5 text-on-surface-variant font-medium hover:text-error transition-colors"
                >
                  Cancelar
                </button>
              </div>
              <button 
                type="submit"
                className="px-8 py-2.5 rounded-lg bg-primary text-on-primary font-bold shadow-lg shadow-primary/10 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
              >
                {evaluationStep === 1 ? 'Continuar a Biomarcadores' : evaluationStep === 2 ? 'Continuar a Historial Clínico' : 'Finalizar y Calcular Riesgo'}
                {evaluationStep === 3 ? <Rocket size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal 
        isOpen={isAddMarkerModalOpen} 
        onClose={() => setIsAddMarkerModalOpen(false)} 
        title="Añadir Marcador"
        maxWidth="max-w-md"
        zIndex="z-[60]"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-label text-on-surface-variant">Tipo de biomarcador</label>
            <select className="bg-surface-container-high border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-tertiary transition-colors appearance-none text-on-background">
              <optgroup label="Inflamatorios">
                <option>Interleucina-6 (IL-6)</option>
                <option>Procalcitonina</option>
                <option>Factor de Necrosis Tumoral (TNF)</option>
              </optgroup>
              <optgroup label="Metabólicos">
                <option>Colesterol HDL</option>
                <option>Triglicéridos</option>
                <option>Urea</option>
                <option>Creatinina</option>
              </optgroup>
              <optgroup label="Otros">
                <option>Dímero D</option>
                <option>Troponina</option>
              </optgroup>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-label text-on-surface-variant">Valor de medición</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input type="number" step="0.01" placeholder="0.00" className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-4 text-2xl font-headline font-bold focus:outline-none focus:border-tertiary transition-colors" />
              </div>
              <div className="w-1/3">
                <select 
                  value={markerUnit}
                  onChange={(e) => setMarkerUnit(e.target.value)}
                  className="w-full h-full bg-surface-container-high border border-white/10 rounded-xl px-3 py-4 text-xs font-label text-on-surface-variant focus:outline-none focus:border-tertiary transition-colors appearance-none"
                >
                  <option value="mg/L">mg/L</option>
                  <option value="mm/h">mm/h</option>
                  <option value="10³/µL">10³/µL</option>
                  <option value="g/dL">g/dL</option>
                  <option value="%">%</option>
                  <option value="ng/dL">ng/dL</option>
                  <option value="µmol/L">µmol/L</option>
                  <option value="custom">Otro...</option>
                </select>
              </div>
            </div>
            {markerUnit === 'custom' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-1"
              >
                <input 
                  type="text" 
                  placeholder="Especificar unidad..." 
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-tertiary transition-colors"
                />
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-tertiary/5 border border-tertiary/20 rounded-xl">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-tertiary shrink-0 mt-0.5" />
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Este marcador será integrado en la trayectoria predictiva de riesgo 
                y calibrará el modelo de IA para el paciente actual.
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setIsAddMarkerModalOpen(false)}
            className="w-full py-4 bg-tertiary text-on-tertiary font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-tertiary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Agregar a Evaluación
          </button>
        </div>
      </Modal>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-bold text-sm",
        active 
          ? "bg-primary-container text-primary shadow-lg shadow-primary/5 scale-[0.98]" 
          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
      )}
    >
      <span className={cn(active ? "text-primary" : "text-on-surface-variant")}>{icon}</span>
      <span className="font-label">{label}</span>
    </button>
  );
}

interface DashboardProps {
  setActiveTab: (tab: 'dashboard' | 'timeline' | 'eiri' | 'optimizer' | 'economics') => void;
  setSelectedPatient: (p: string) => void;
  setIsPatientListOpen: (open: boolean) => void;
}

const DashboardView: React.FC<DashboardProps> = ({ 
  setActiveTab, 
  setSelectedPatient, 
  setIsPatientListOpen 
}) => {
  const stats = [
    { label: 'Total Pacientes', value: '1,428', trend: 'up', trendValue: '+12', icon: <Users size={20} />, color: 'primary' },
    { label: 'Riesgo Crítico', value: '42', trend: 'down', trendValue: '-5', icon: <AlertTriangle size={20} />, color: 'error' },
    { label: 'Optimizados', value: '89%', trend: 'up', trendValue: '+4%', icon: <CheckCircle size={20} />, color: 'secondary' },
    { label: 'Ahorro Proyectado', value: '$1.2M', trend: 'up', trendValue: '+$140k', icon: <DollarSign size={20} />, color: 'tertiary' },
  ];

  const riskDistribution = [
    { name: 'Bajo', count: 850, color: '#4fdbc8' },
    { name: 'Medio', count: 430, color: '#00dbe7' },
    { name: 'Alto', count: 148, color: '#ffb4ab' },
  ];

  const recentAlerts = [
    { patient: 'Ricardo M.', id: '4892-XP', alert: 'PCR ↑ 150%', time: '2h ago', level: 'high' },
    { patient: 'Elena S.', id: '3310-LT', alert: 'Albúmina ↓ 0.4', time: '5h ago', level: 'medium' },
    { patient: 'Carlos J.', id: '9021-QA', alert: 'Glucemia Crítica', time: '8h ago', level: 'high' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-20"
    >
      {/* 1. Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-surface-container-high transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-xl bg-opacity-10", 
                stat.color === 'primary' ? 'bg-primary text-primary' : 
                stat.color === 'error' ? 'bg-error text-error' : 
                stat.color === 'secondary' ? 'bg-secondary text-secondary' : 
                'bg-tertiary text-tertiary'
              )}>
                {stat.icon}
              </div>
              <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", 
                stat.trend === 'up' ? 'text-secondary' : 'text-error'
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trendValue}
              </div>
            </div>
            <div className="space-y-1">
              <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest leading-none">{stat.label}</span>
              <div className="font-headline text-3xl font-bold text-on-surface">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 2. Population Risk Chart */}
        <div className="col-span-12 lg:col-span-8 glass-panel p-8 rounded-2xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Distribución de Riesgo</h3>
              <p className="text-on-surface-variant text-xs mt-1">Monitoreo poblacional de 1,428 casos activos</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface hover:bg-white/10 transition-colors">Semanal</button>
              <button className="px-4 py-2 rounded-lg text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">Mensual</button>
            </div>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-3 gap-4 items-end px-4">
            {riskDistribution.map((group, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-full relative flex flex-col items-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(group.count / 1000) * 100}%` }}
                    className="w-20 sm:w-32 rounded-t-xl relative overflow-hidden"
                    style={{ backgroundColor: group.color, minHeight: '40px' }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                  <span className="absolute -top-8 font-headline font-bold text-on-surface group-hover:scale-110 transition-transform">{group.count}</span>
                </div>
                <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-widest">{group.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Severidad Promedio</span>
              <span className="font-headline text-xl font-bold text-tertiary">34.2%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Delta Mensual</span>
              <span className="font-headline text-xl font-bold text-secondary">-4.8%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Capacidad de Opt.</span>
              <span className="font-headline text-xl font-bold text-primary">High</span>
            </div>
          </div>
        </div>

        {/* 3. Recent Alerts Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline text-lg font-bold text-on-surface">Alertas Rojas</h3>
              <span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded uppercase">3 críticas</span>
            </div>
            
            <div className="space-y-4 flex-1">
              {recentAlerts.map((alert, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-container-low border border-white/5 hover:bg-surface-container-high transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-on-surface text-sm">{alert.patient}</div>
                    <div className="text-[10px] text-on-surface-variant font-mono">{alert.time}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase border", 
                      alert.level === 'high' ? 'bg-error/10 text-error border-error/20' : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                    )}>
                      {alert.alert}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">ID: {alert.id}</span>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('eiri'); setSelectedPatient(alert.patient); }}
                    className="w-full py-2 bg-surface-container-highest text-[10px] font-bold text-on-surface rounded-lg opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest"
                  >
                    Intervenir Caso
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest border border-white/5 rounded-xl">
              Ver Historial de Alertas
            </button>
          </div>
        </div>
      </div>

      {/* 4. Priorities Table Section */}
      <div className="glass-panel p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Pacientes Prioritarios</h3>
            <p className="text-on-surface-variant text-[10px] mt-1 uppercase tracking-widest">Ordenados por Proyección de Riesgo PJI</p>
          </div>
          <button 
            onClick={() => setIsPatientListOpen(true)}
            className="flex items-center gap-2 text-primary font-bold text-xs hover:underline uppercase tracking-widest"
          >
            Ver base de datos completa <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-on-surface-variant/60 text-[10px] uppercase font-label tracking-[0.2em]">
                <th className="px-4 py-2">Paciente</th>
                <th className="px-4 py-2">Factores Clave</th>
                <th className="px-4 py-2">Riesgo IA</th>
                <th className="px-4 py-2 text-right">Acción Requerida</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Roberto Valente', id: '2219-MX', factors: 'BMI 38, HbA1c 8.2', risk: 84, color: '#ffb4ab' },
                { name: 'Lucia Ferreyra', id: '7721-AR', factors: 'PCR 112, Alb 3.1', risk: 72, color: '#ffb4ab' },
                { name: 'Miguel Angel', id: '4432-ES', factors: 'NLR 7.5, Edad 82', risk: 65, color: '#00dbe7' },
              ].map((p, i) => (
                <tr key={i} className="group bg-surface-container-low/40 hover:bg-surface-container-high/40 transition-colors">
                  <td className="px-4 py-4 rounded-l-xl border-y border-l border-white/5">
                    <div className="font-bold text-on-surface text-sm">{p.name}</div>
                    <div className="font-mono text-[9px] text-on-surface-variant uppercase">NHC: {p.id}</div>
                  </td>
                  <td className="px-4 py-4 border-y border-white/5">
                    <div className="flex gap-2">
                      {p.factors.split(', ').map((f, fi) => (
                        <span key={fi} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-on-surface-variant border border-white/5 font-medium">{f}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 border-y border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.risk}%` }}
                          className="h-full"
                          style={{ backgroundColor: p.color }}
                        />
                      </div>
                      <span className="font-headline font-bold text-on-surface text-sm">{p.risk}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 rounded-r-xl border-y border-r border-white/5 text-right">
                    <button 
                      onClick={() => { setActiveTab('eiri'); setSelectedPatient(p.name); }}
                      className="px-4 py-2 bg-primary-container text-primary font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-primary hover:text-on-primary transition-all"
                    >
                      Optimizar Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
function MetricCard({ label, value, trend, trendValue, color = 'default', icon }: { label: string, value: string, trend: 'up' | 'down' | 'stable', trendValue: string, color?: 'default' | 'high' | 'low', icon?: React.ReactNode }) {
  const isHigh = color === 'high';
  return (
    <div className="glass-card p-6 border-l-4 transition-all" style={{ borderLeftColor: isHigh ? '#f87171' : '#22d3ee' }}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{label}</p>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          {icon || <Activity size={14} className="text-cyan-400" />}
        </div>
      </div>
      <p className={cn(
        "text-3xl font-black tracking-tight",
        isHigh ? "text-red-400" : "text-white"
      )}>
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-4">
        <div className={cn(
          "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
          trend === 'up' ? (isHigh ? "bg-red-400/10 text-red-400 border border-red-400/20" : "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20") : 
          "bg-slate-400/10 text-slate-400 border border-slate-400/20"
        )}>
          {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {trendValue}
        </div>
      </div>
    </div>
  );
}

function CheckItem({ label, met, type }: { label: string, met: boolean, type: 'Mayor' | 'Menor' }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all border",
          met 
            ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 neon-border" 
            : "bg-white/5 text-slate-700 border-white/10"
        )}>
          {met ? <ChevronRight size={14} strokeWidth={4} /> : <div className="w-1 h-1 bg-slate-800 rounded-full" />}
        </div>
        <span className={cn(
          "text-xs font-semibold transition-colors leading-tight",
          met ? "text-slate-100" : "text-slate-500"
        )}>{label}</span>
      </div>
      <span className={cn(
        "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter",
        type === 'Mayor' ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/5 text-slate-500 border border-white/5"
      )}>
        {type}
      </span>
    </div>
  );
}

// Stubs for other views - will implement in detail in subsequent steps
function TimelineView() {
  const timelineData = [
    { day: 0, event: 'Cirugía Primaria (ATR)', status: 'Línea Base', risk: 15 },
    { day: 15, event: 'Drenaje de Herida', status: 'Advertencia', risk: 25 },
    { day: 30, event: 'Elevación VSG/PCR', status: 'Alarma', risk: 45 },
    { day: 45, event: 'Supresión Antibiótica', status: 'Estable', risk: 40 },
    { day: 60, event: 'Dolor Recurrente', status: 'Crítico', risk: 75 },
    { day: 75, event: 'Aspiración Articular', status: 'Confirmado', risk: 88 },
    { day: 90, event: 'Revisión Planificada', status: 'Terminal', risk: 95 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 pb-20 mt-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Evolución Clínica (Película)</h2>
        <p className="text-slate-500 font-medium">Evaluación longitudinal de "eventos" biológicos vs. Consenso de Filadelfia.</p>
      </div>

      <div className="relative">
        {/* Continuous Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-cyan-500 via-orange-500 to-red-500"
          />
        </div>

        <div className="space-y-24 relative pt-12">
          {timelineData.map((item, idx) => (
            <TimelineItem 
              key={idx} 
              data={item} 
              align={idx % 2 === 0 ? 'left' : 'right'} 
              delay={idx * 0.2}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ data, align, delay }: { data: any, align: 'left' | 'right', delay: number, key?: React.Key }) {
  const isLeft = align === 'left';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "flex items-center w-full justify-center group",
        isLeft ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div className={cn(
        "w-1/2 px-12",
        isLeft ? "text-right" : "text-left"
      )}>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">Día {data.day}</p>
        <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{data.event}</h4>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed font-medium">
          La firma biológica en esta etapa indicó un cambio en el índice EIRI, 
          precediendo a la fístula clínica por 3 semanas.
        </p>
      </div>

      <div className="relative flex items-center justify-center w-0">
        <div className={cn(
          "w-12 h-12 rounded-full border-4 border-slate-900 shadow-2xl flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-125 neon-border",
          data.risk > 70 ? "bg-red-500" : data.risk > 30 ? "bg-orange-500" : "bg-cyan-500"
        )}>
          <span className="text-slate-900 text-[10px] font-black">{data.risk}%</span>
        </div>
      </div>

      <div className="w-1/2 px-12">
        <div className={cn(
          "inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
          data.risk > 70 ? "bg-red-400/10 text-red-400 border-red-400/20" :
          data.risk > 30 ? "bg-orange-400/10 text-orange-400 border-orange-400/20" :
          "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"
        )}>
          {data.status}
        </div>
      </div>
    </motion.div>
  );
}

function EIRIView({ 
  selectedPatient, 
  patientEconomics, 
  setPatientEconomics,
  referenceCosts,
  isDiagnosticModalOpen,
  setIsDiagnosticModalOpen,
  key
}: { 
  selectedPatient: string, 
  patientEconomics: Record<string, any>, 
  setPatientEconomics: (e: any) => void,
  referenceCosts: any,
  isDiagnosticModalOpen: boolean,
  setIsDiagnosticModalOpen: (o: boolean) => void,
  key?: string
}) {
  const currentCosts = patientEconomics[selectedPatient] || referenceCosts;
  const [isEconomicsOpen, setIsEconomicsOpen] = useState(false);
  const [diagnosticPhase, setDiagnosticPhase] = useState<'idle' | 'analyzing' | 'complete'>('idle');

  const runDiagnostic = () => {
    setIsDiagnosticModalOpen(true);
    setDiagnosticPhase('analyzing');
    setTimeout(() => setDiagnosticPhase('complete'), 3000);
  };

  const handleUpdate = (key: string, val: string) => {
    const numericVal = parseInt(val) || 0;
    setPatientEconomics((prev: any) => ({
      ...prev,
      [selectedPatient]: {
        ...(prev[selectedPatient] || referenceCosts),
        [key]: numericVal
      }
    }));
  };

  const totalPJI = currentCosts.pjiSurgery + currentCosts.pjiHospital + currentCosts.pjiAntibiotics + currentCosts.pjiMargin;
  const totalITEC = currentCosts.itecHygiene + currentCosts.itecNutrition + currentCosts.itecDigital + currentCosts.itecLogistics;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-20 mt-4"
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Form Side */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Sección 1: Entradas Clásicas */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/20"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HeartPulse className="text-primary" size={20} />
              </div>
              <h3 className="font-headline text-lg font-bold uppercase tracking-wider text-on-surface">Entradas Clásicas</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block">PCR (mg/L)</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border border-white/5 text-xl font-headline font-bold text-on-surface rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/20" placeholder="0.0" step="0.1" type="number"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block">VSG (mm/h)</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border border-white/5 text-xl font-headline font-bold text-on-surface rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/20" placeholder="0" step="1" type="number"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block">Leucocitos (10³/µL)</label>
                <div className="relative group">
                  <input className="w-full bg-surface-container-low border border-white/5 text-xl font-headline font-bold text-on-surface rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/20" placeholder="0.00" step="0.01" type="number"/>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Extended Inflammatory Risk Index (EIRI) */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-tertiary/20"></div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tertiary/10 rounded-lg">
                  <FlaskConical className="text-tertiary" size={20} />
                </div>
                <h3 className="font-headline text-lg font-bold uppercase tracking-wider text-tertiary">Protocolo EIRI</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-tertiary/10 rounded-full border border-tertiary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></div>
                <span className="font-label text-tertiary text-[10px] uppercase tracking-widest">Capa Aumentada por IA</span>
              </div>
            </div>

            <div className="space-y-8">
              {/* EIRI Rows */}
              <EIRIRow 
                label="NLR (Ratio)" 
                sublabel="Neutrófilo-Linfocito" 
                value={4.2} 
                trend="up" 
                trendValue="12%" 
                color="#aecae2"
                points={[15, 12, 16, 10, 5, 2]} 
              />
              <EIRIRow 
                label="Albúmina (g/dL)" 
                sublabel="Concentración Sérica" 
                value={3.1} 
                status="Subclínico"
                trend="down" 
                trendValue="0.4"
                color="#ffb4ab"
                points={[5, 6, 8, 12, 15, 18]} 
                isError
              />
              <EIRIRow 
                label="IL-6 (pg/mL)" 
                sublabel="Interleucina-6" 
                value={18} 
                trend="stable" 
                trendValue="± 2%" 
                color="#4fdbc8"
                points={[18, 17, 18, 10, 12]} 
              />
              <EIRIRow 
                label="Procalcitonina" 
                sublabel="ng/mL" 
                placeholder="0.00"
                noData
              />
              <EIRIRow 
                label="Ferritina (µg/L)" 
                sublabel="Ferritina Sérica" 
                value={312} 
                trend="up" 
                trendValue="4%" 
                color="#aecae2"
                points={[15, 14, 15, 13, 11, 9]} 
              />
            </div>
          </div>

          {/* Nueva Sección: Impacto Económico Personalizado */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden border border-primary/10 shadow-lg">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/40"></div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold uppercase tracking-wider text-on-surface">Impacto Económico Personalizado</h3>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 uppercase tracking-widest">Ajuste de costos específicos para este caso</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEconomicsOpen(!isEconomicsOpen)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-on-surface-variant"
              >
                <ChevronDown className={cn("transition-transform", isEconomicsOpen ? "rotate-180" : "")} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-error uppercase tracking-widest">Costo de Fallo (PJI)</span>
                  <span className="text-xl font-headline font-black text-on-surface">${totalPJI.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-error/40 w-full shadow-[0_0_10px_rgba(255,180,171,0.3)]"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Inversión ITEC+</span>
                  <span className="text-xl font-headline font-black text-on-surface">${totalITEC.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary/40 w-full shadow-[0_0_10px_rgba(79,219,200,0.3)]"></div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isEconomicsOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-10 pt-10 border-t border-white/5 space-y-10"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <CostInput label="Cirugía" value={currentCosts.pjiSurgery} onChange={(v) => handleUpdate('pjiSurgery', v)} />
                    <CostInput label="Hospital" value={currentCosts.pjiHospital} onChange={(v) => handleUpdate('pjiHospital', v)} />
                    <CostInput label="Meds/IV" value={currentCosts.pjiAntibiotics} onChange={(v) => handleUpdate('pjiAntibiotics', v)} />
                    <CostInput label="Logística" value={currentCosts.itecLogistics} onChange={(v) => handleUpdate('itecLogistics', v)} />
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <TrendingUp className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">Ahorro Neto Estimado</h4>
                        <span className="text-2xl font-headline font-black text-primary">${(totalPJI - totalITEC).toLocaleString()}</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        Este monto representa el potencial de eficiencia económica si se previene la complicación en este paciente específico.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Projection / AI Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Insights Card */}
          <div className="bg-primary-container/80 p-8 rounded-2xl border border-tertiary/20 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-tertiary/10 blur-[50px] rounded-full"></div>
            <div className="flex items-center gap-2 mb-6">
              <Brain className="text-tertiary" size={24} />
              <h4 className="font-label text-tertiary uppercase text-xs tracking-widest font-bold">Random Forest Insight</h4>
            </div>
            
            <div className="mb-8">
              <span className="font-label text-on-primary-container/60 text-[10px] block mb-2 uppercase tracking-widest">PROYECCIÓN DE RIESGO AGREGADO</span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-6xl font-bold text-on-surface">72.4</span>
                <span className="font-headline text-2xl text-tertiary font-bold">%</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-label font-bold tracking-widest">
                  <span className="text-on-primary-container/60 uppercase">CONFIANZA PREDICTIVA</span>
                  <span className="text-tertiary">94%</span>
                </div>
                <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    className="h-full bg-tertiary shadow-[0_0_15px_rgba(0,219,231,0.5)]" 
                  />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant italic font-medium pt-4 border-t border-white/5">
                "La caída de albúmina de 0.4g/dL en 48h se identificó como un impulsor de riesgo primario, a pesar de estar dentro del rango de referencia 'normal'."
              </p>
            </div>
          </div>

          {/* Sparkline Summary Grid */}
          <div className="glass-panel p-8 rounded-2xl">
            <h4 className="font-label text-on-surface-variant uppercase text-[10px] tracking-widest font-bold mb-8">Biomarcadores del Paciente</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 space-y-4">
                <span className="font-label text-[10px] text-on-surface-variant block uppercase tracking-widest">Inflam. Central</span>
                <div className="font-headline text-3xl font-bold text-primary">0.82</div>
                <div className="h-10 w-full opacity-50">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path d="M0,15 Q25,5 50,12 T100,8" fill="none" stroke="#aecae2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 space-y-4">
                <span className="font-label text-[10px] text-on-surface-variant block uppercase tracking-widest">Bio-Metabólico</span>
                <div className="font-headline text-3xl font-bold text-secondary">3.4</div>
                <div className="h-10 w-full opacity-50">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path d="M0,10 Q30,18 60,8 T100,12" fill="none" stroke="#4fdbc8" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={runDiagnostic}
              className="w-full bg-tertiary text-on-tertiary font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-tertiary/10 uppercase tracking-widest text-sm"
            >
              <Calculator size={20} />
              EJECUTAR DIAGNÓSTICO COMPLETO
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-surface-container-low border border-white/10 text-on-surface text-[10px] font-bold py-4 rounded-xl hover:bg-white/5 flex items-center justify-center gap-2 transition-all uppercase tracking-widest">
                <Download size={14} className="text-on-surface-variant" />
                Exportar PDF
              </button>
              <button className="bg-surface-container-low border border-white/10 text-on-surface text-[10px] font-bold py-4 rounded-xl hover:bg-white/5 flex items-center justify-center gap-2 transition-all uppercase tracking-widest">
                <Save size={14} className="text-on-surface-variant" />
                Borrador
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isDiagnosticModalOpen} 
        onClose={() => setIsDiagnosticModalOpen(false)} 
        title="Protocolo de Diagnóstico IA iTec+"
      >
        <div className="space-y-8">
          {diagnosticPhase === 'analyzing' ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 rounded-full border-2 border-tertiary/20 border-t-tertiary"
                />
                <Brain size={32} className="absolute inset-0 m-auto text-tertiary animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-headline text-lg font-bold text-on-surface">Procesando Red Neuronal...</h4>
                <div className="space-y-1">
                  <TypingText text="Correlando biomarcadores EIRI..." delay={0} />
                  <TypingText text="Calculando Delta Biológico de Albúmina..." delay={1000} />
                  <TypingText text="Estimando ROI de Optimización..." delay={2000} />
                </div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface-container-high p-6 rounded-2xl border border-error/20">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block mb-4">RIESGO AGREGADO PJI</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-5xl font-black text-error">72.4</span>
                    <span className="text-xl font-bold text-on-surface">%</span>
                  </div>
                </div>
                <div className="bg-surface-container-high p-6 rounded-2xl border border-primary/20">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest block mb-4">AHORRO PROYECTADO</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline text-5xl font-black text-primary">${(totalPJI - totalITEC).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-black">Factores Determinantes (SHAP Value)</h4>
                <div className="space-y-3">
                  <ShapBar label="Hipoalbuminemia Crítica" value={42} color="bg-error" />
                  <ShapBar label="IMC > 35 (Obesidad II)" value={28} color="bg-error/60" />
                  <ShapBar label="NLR Ratio (>3.5)" value={15} color="bg-tertiary" />
                  <ShapBar label="Protección Edad/Estado" value={-15} color="bg-secondary" />
                </div>
              </div>

              <div className="p-6 bg-error-container/10 border-l-4 border-error rounded-r-2xl">
                <h5 className="text-sm font-black text-error uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} /> Decisión Clínica Recomendada
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  "El paciente presenta una caída asintomática de albúmina pre-quirúrgica. El modelo sugiere suspender o retrasar la cirugía por **14 días** para completar un ciclo de soporte nutricional intensivo. Esto reduciría la probabilidad de infección en un **38%**, protegiendo un margen operativo de **$83,800**."
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDiagnosticModalOpen(false)}
                  className="flex-1 py-4 bg-surface-container-highest text-on-surface font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 transition-all"
                >
                  Cerrar
                </button>
                <button 
                  onClick={() => setIsDiagnosticModalOpen(false)}
                  className="flex-1 py-4 bg-primary text-on-primary font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                >
                  Confirmar Protocolo
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </Modal>
    </motion.div>
  );
}

function TypingText({ text, delay }: { text: string, delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest"
    >
      &gt; {text}
    </motion.div>
  );
}

function ShapBar({ label, value, color }: { label: string, value: number, color: string }) {
  const isNegative = value < 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
        <span className="text-on-surface-variant">{label}</span>
        <span className={isNegative ? "text-secondary" : "text-error"}>{value > 0 ? `+${value}` : value}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden flex">
        {isNegative ? (
          <div className="flex-1 flex justify-end">
            <div className={cn("h-full rounded-full mr-[50%]", color)} style={{ width: `${Math.abs(value)}%` }}></div>
          </div>
        ) : (
          <div className="flex-1 flex justify-start">
            <div className={cn("h-full rounded-full ml-[50%]", color)} style={{ width: `${value}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsView({ aiConfig, setAiConfig, key }: { aiConfig: any, setAiConfig: (c: any) => void, key?: string }) {
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleUpdate = (key: string, val: string | number) => {
    setAiConfig((prev: any) => ({ ...prev, [key]: val }));
  };

  const testConnection = () => {
    setTestStatus('loading');
    setTimeout(() => {
      setTestStatus(aiConfig.apiKey ? 'success' : 'error');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Settings className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="font-headline text-3xl font-black text-on-background tracking-tight">Configuración del Sistema</h2>
          <p className="text-on-surface-variant text-sm font-medium">Gestión del motor de Redes Neuronales iTec+</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* AI Engine Config */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
                <Brain className="text-tertiary" size={20} />
                Motor de Inteligencia Artificial
              </h3>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                testStatus === 'success' ? "bg-secondary/10 text-secondary border border-secondary/20" : "bg-white/5 text-on-surface-variant"
              )}>
                <div className={cn("w-1.5 h-1.5 rounded-full", testStatus === 'success' ? "bg-secondary animate-pulse" : "bg-on-surface-variant")}></div>
                {testStatus === 'success' ? 'Online' : 'Offline'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Proveedor de LLM</label>
                <select 
                  value={aiConfig.engine}
                  onChange={(e) => handleUpdate('engine', e.target.value)}
                  className="w-full bg-surface-container-low border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option>Gemini 1.5 Pro</option>
                  <option>Gemini 1.5 Flash</option>
                  <option>Custom API (OpenAI compatible)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">ID del Modelo</label>
                <input 
                  type="text" 
                  value={aiConfig.model}
                  onChange={(e) => handleUpdate('model', e.target.value)}
                  className="w-full bg-surface-container-low border border-white/5 rounded-xl px-4 py-3 text-sm font-mono text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">API Key / Token de Acceso</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Ingrese su clave de API..."
                    value={aiConfig.apiKey}
                    onChange={(e) => handleUpdate('apiKey', e.target.value)}
                    className="w-full bg-surface-container-low border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <Database className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                </div>
                <p className="text-[9px] text-on-surface-variant italic">Las claves se cifran localmente y nunca tocan nuestros servidores.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-4">
              <button 
                onClick={testConnection}
                disabled={testStatus === 'loading'}
                className="flex-1 py-3 bg-surface-container-high text-on-surface hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                {testStatus === 'loading' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Database size={14} /></motion.div>
                ) : <ActivityIcon size={14} />}
                Probar Conexión
              </button>
              <button className="flex-1 py-3 bg-primary text-on-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                Guardar Configuración
              </button>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
              <FileText className="text-secondary" size={20} />
              Prompt del Sistema (Contexto Médico)
            </h3>
            <textarea 
              rows={4}
              value={aiConfig.systemPrompt}
              onChange={(e) => handleUpdate('systemPrompt', e.target.value)}
              className="w-full bg-surface-container-low border border-white/5 rounded-xl px-4 py-4 text-xs leading-relaxed text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-tertiary/10 border border-tertiary/20 p-8 rounded-2xl space-y-6">
            <div className="w-12 h-12 bg-tertiary/20 rounded-xl flex items-center justify-center">
              <Sparkles className="text-tertiary" />
            </div>
            <h4 className="font-headline text-lg font-bold text-on-surface uppercase tracking-tight">Parámetros IA</h4>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Temperatura</label>
                  <span className="text-xs font-mono text-tertiary font-bold">{aiConfig.temperature}</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={aiConfig.temperature}
                  onChange={(e) => handleUpdate('temperature', parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-tertiary"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Max Tokens</label>
                  <span className="text-xs font-mono text-tertiary font-bold">{aiConfig.maxTokens}</span>
                </div>
                <input 
                  type="range" min="256" max="4096" step="128" 
                  value={aiConfig.maxTokens}
                  onChange={(e) => handleUpdate('maxTokens', parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-tertiary"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-center space-y-4">
            <div className="mx-auto w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-secondary" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black text-on-surface uppercase tracking-widest">Seguridad de Datos</div>
              <p className="text-[9px] text-on-surface-variant leading-relaxed">
                iTec+ opera bajo HIPAA compliance. Las credenciales de API se almacenan en el **Secure Enclave** de su navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EconomicsDashboardView({ 
  referenceCosts, 
  setReferenceCosts,
  totalPJI,
  totalITEC
}: { 
  referenceCosts: any, 
  setReferenceCosts: (c: any) => void,
  totalPJI: number,
  totalITEC: number,
  key?: string
}) {
  const [isEditing, setIsEditing] = useState(false);

  const costsSummary = [
    { name: 'Costo por Infección (PJI)', value: `$${totalPJI.toLocaleString()}`, detail: 'Impacto total por complicación evitada', color: 'text-error' },
    { name: 'Inversión por Paciente', value: `$${totalITEC.toLocaleString()}`, detail: 'Costo total del protocolo preventivo', color: 'text-secondary' },
    { name: 'Ahorro Neto por Caso', value: `$${(totalPJI - totalITEC).toLocaleString()}`, detail: 'Eficiencia operativa recuperada', color: 'text-primary' },
  ];

  const projectionData = [
    { month: 'Ene', savings: totalPJI * 0.05, baseline: totalPJI * 0.12 },
    { month: 'Feb', savings: totalPJI * 0.1, baseline: totalPJI * 0.15 },
    { month: 'Mar', savings: totalPJI * 0.25, baseline: totalPJI * 0.2 },
    { month: 'Abr', savings: totalPJI * 0.45, baseline: totalPJI * 0.25 },
    { month: 'May', savings: totalPJI * 0.8, baseline: totalPJI * 0.3 },
  ];

  const handleUpdate = (key: string, val: string) => {
    setReferenceCosts((prev: any) => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-20"
    >
      <div className="flex justify-between items-center bg-surface-container/40 p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="font-headline text-xl font-bold text-on-surface">Centro de Inteligencia Financiera</h2>
          <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Simulación dinámica de ROI y Ahorro Operativo</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest",
            isEditing ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(174,202,226,0.3)]" : "bg-surface-container-high text-on-surface border border-white/10 hover:bg-white/5"
          )}
        >
          {isEditing ? <Check size={16} /> : <Settings size={16} />}
          {isEditing ? 'Confirmar Parámetros' : 'Editar Costos de Referencia'}
        </button>
      </div>

      {isEditing && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-panel p-8 rounded-2xl border-primary/20"
        >
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-error uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <AlertTriangle size={12} /> Desglose Costo de Fallo (PJI)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <CostInput label="Cirugía Revisión" value={referenceCosts.pjiSurgery} onChange={(v) => handleUpdate('pjiSurgery', v)} />
              <CostInput label="Estancia Hospit." value={referenceCosts.pjiHospital} onChange={(v) => handleUpdate('pjiHospital', v)} />
              <CostInput label="Medicamentos/IV" value={referenceCosts.pjiAntibiotics} onChange={(v) => handleUpdate('pjiAntibiotics', v)} />
              <CostInput label="Costos Indirectos" value={referenceCosts.pjiMargin} onChange={(v) => handleUpdate('pjiMargin', v)} />
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Sparkles size={12} /> Inversión Protocolo ITEC+
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <CostInput label="Kit Higiene Especial" value={referenceCosts.itecHygiene} onChange={(v) => handleUpdate('itecHygiene', v)} />
              <CostInput label="Suplementación Nut." value={referenceCosts.itecNutrition} onChange={(v) => handleUpdate('itecNutrition', v)} />
              <CostInput label="Sensorica / IA" value={referenceCosts.itecDigital} onChange={(v) => handleUpdate('itecDigital', v)} />
              <CostInput label="Coordinación" value={referenceCosts.itecLogistics} onChange={(v) => handleUpdate('itecLogistics', v)} />
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {costsSummary.map((cost, i) => (
          <div key={i} className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <DollarSign size={64} />
            </div>
            <div className="space-y-4">
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">{cost.name}</span>
              <div className={cn("font-headline text-4xl font-black tracking-tighter", cost.color)}>{cost.value}</div>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">{cost.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 glass-panel p-8 rounded-2xl flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-2xl font-bold text-on-surface">Impacto Económico Agregado</h3>
              <p className="text-on-surface-variant text-sm mt-1 font-medium italic opacity-80">Proyección mensual de ahorro basada en reducción de ratio de re-intervención</p>
            </div>
          </div>

          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00dbe7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00dbe7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#c3c7cd', fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c2b3c', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#00dbe7' }}
                />
                <Area type="monotone" dataKey="savings" stroke="#00dbe7" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={4} />
                <Area type="monotone" dataKey="baseline" stroke="#ffffff10" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl space-y-6">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-primary" />
            </div>
            <h4 className="font-headline text-lg font-bold text-on-surface uppercase tracking-tight">Eficiencia de Inversión</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-on-surface-variant">ROI Predicho</span>
                <span className="text-2xl font-black text-primary tracking-tighter">{(totalPJI / totalITEC).toFixed(1)}:1</span>
              </div>
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_15px_rgba(174,202,226,0.3)] transition-all duration-1000"
                  style={{ width: `${Math.min((totalPJI / totalITEC) * 5, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Bajo los parámetros definidos, cada dólar invertido hoy evita **${(totalPJI / totalITEC).toFixed(2)}** en costos futuros por complicaciones Quirúrgicas.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            <h4 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-6">Métricas de Liberación</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-3xl font-headline font-bold text-secondary">32d</div>
                <div className="text-[9px] text-on-surface-variant uppercase tracking-widest leading-tight">Camas de Estancia<br />Recuperadas</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-headline font-bold text-tertiary">15%</div>
                <div className="text-[9px] text-on-surface-variant uppercase tracking-widest leading-tight">Capacidad de<br />Quirófano Nueva</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CostInput({ label, value, onChange }: { label: string, value: number, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">{label}</label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs font-bold">$</span>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-container-low border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm font-headline font-bold text-on-surface focus:ring-1 focus:ring-primary outline-none transition-all group-hover:border-white/10"
        />
      </div>
    </div>
  );
}

function EIRIRow({ 
  label, 
  sublabel, 
  value, 
  placeholder,
  trend, 
  trendValue, 
  color, 
  points = [], 
  noData = false, 
  isError = false,
  status
}: { 
  label: string, 
  sublabel: string, 
  value?: number, 
  placeholder?: string,
  trend?: 'up' | 'down' | 'stable', 
  trendValue?: string, 
  color?: string, 
  points?: number[], 
  noData?: boolean, 
  isError?: boolean,
  status?: string
}) {
  return (
    <div className={cn(
      "grid grid-cols-12 gap-6 items-center border-t border-white/5 pt-8",
      noData && "opacity-60"
    )}>
      <div className="col-span-12 md:col-span-3">
        <label className="font-label text-xs text-on-surface uppercase block font-bold tracking-widest">{label}</label>
        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{sublabel}</span>
      </div>
      <div className="col-span-6 md:col-span-4 relative group">
        <input 
          className={cn(
            "w-full bg-surface-container-low border text-lg font-headline font-bold rounded-xl px-4 py-4 focus:ring-1 outline-none transition-all",
            isError ? "border-error/30 text-error focus:ring-error" : "border-white/5 text-on-surface focus:ring-tertiary"
          )}
          step="0.1" 
          type="number" 
          defaultValue={value}
          placeholder={placeholder}
        />
        {status && (
          <div className="absolute -right-2 -top-2 bg-error text-on-error text-[8px] px-2 rounded-full font-black uppercase py-1 shadow-lg ring-4 ring-surface-dim">
            {status}
          </div>
        )}
      </div>
      <div className="col-span-6 md:col-span-5 flex items-center gap-4 bg-surface-container-low/50 p-2 pl-4 rounded-xl border border-white/5">
        {!noData ? (
          <>
            <svg className="flex-1 h-10 overflow-visible" viewBox="0 0 100 20">
              <path 
                d={`M 0 ${points[0]} ${points.slice(1).map((p, i) => `L ${(i + 1) * (100 / (points.length - 1))} ${p}`).join(' ')}`} 
                fill="none" 
                stroke={color} 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="100" cy={points[points.length - 1]} fill={color} r="3" />
            </svg>
            <div className="text-right min-w-[60px] border-l border-white/5 pl-4">
              <div className={cn("text-[8px] font-label uppercase tracking-widest", trend === 'stable' ? "text-secondary" : trend === 'up' ? "text-primary" : "text-error")}>
                {trend === 'stable' ? 'Estable' : trend === 'up' ? 'Tendencia' : 'Riesgo'}
              </div>
              <div className={cn("text-xs font-headline font-black", trend === 'stable' ? "text-secondary" : trend === 'up' ? "text-primary" : "text-error")}>
                {trend === 'up' ? <ArrowUpRight size={10} className="inline mr-0.5" /> : trend === 'down' ? <ArrowDownRight size={10} className="inline mr-0.5" /> : null}
                {trendValue}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center py-2 text-[9px] uppercase font-label-sm tracking-widest text-on-surface-variant/40">
            Sin datos históricos disponibles
          </div>
        )}
      </div>
    </div>
  );
}

function OptimizerView() {
  const [params, setParams] = useState({
    bmi: 38,
    hba1c: 8.5,
    albumin: 3.2,
    smoking: true
  });

  const calculatedRisk = useMemo(() => {
    let base = 15;
    if (params.bmi > 30) base += (params.bmi - 30) * 2;
    if (params.hba1c > 7) base += (params.hba1c - 7) * 8;
    if (params.albumin < 3.5) base += (3.5 - params.albumin) * 15;
    if (params.smoking) base += 10;
    return Math.min(Math.round(base), 100);
  }, [params]);

  const optimizedRisk = useMemo(() => {
    let base = 15;
    const optBmi = Math.min(params.bmi, 30);
    const optHba1c = Math.min(params.hba1c, 7);
    const optAlbumin = Math.max(params.albumin, 3.5);
    const optSmoking = false;

    if (optBmi > 30) base += (optBmi - 30) * 2;
    if (optHba1c > 7) base += (optHba1c - 7) * 8;
    if (optAlbumin < 3.5) base += (3.5 - optAlbumin) * 15;
    if (optSmoking) base += 10;
    return Math.min(Math.round(base), 100);
  }, [params]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white uppercase tracking-widest underline decoration-cyan-400/20 underline-offset-8">Optimizador Quirúrgico</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Simulación proyectiva para la optimización dinámica del paciente.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Area */}
        <div className="space-y-8">
          <div className="glass-card p-8 space-y-10">
            <OptimizationSlider 
              label="Índice de Masa Corporal (IMC)" 
              value={params.bmi} 
              min={20} 
              max={50} 
              onChange={(v) => setParams(p => ({ ...p, bmi: v }))}
              unit="kg/m²"
              threshold={30}
            />
            <OptimizationSlider 
              label="HbA1c (Control Glicémico)" 
              value={params.hba1c} 
              min={5} 
              max={12} 
              step={0.1}
              onChange={(v) => setParams(p => ({ ...p, hba1c: v }))}
              unit="%"
              threshold={7}
            />
            <OptimizationSlider 
              label="Albúmina Sérica (Nutrición)" 
              value={params.albumin} 
              min={2} 
              max={5} 
              step={0.1}
              onChange={(v) => setParams(p => ({ ...p, albumin: v }))}
              unit="g/dL"
              threshold={3.5}
              reverse
            />

            <div className="flex items-center justify-between p-5 glass border-white/5 relative overflow-hidden group">
              <div className="absolute inset-y-0 left-0 w-1 bg-red-400"></div>
              <div className="flex items-center gap-3">
                <Info size={18} className="text-slate-500" />
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Tabaquismo Activo</span>
              </div>
              <button 
                onClick={() => setParams(p => ({ ...p, smoking: !p.smoking }))}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all border",
                  params.smoking 
                    ? "bg-red-400 text-slate-900 border-red-300 shadow-lg shadow-red-500/20" 
                    : "bg-white/5 text-slate-500 border-white/10"
                )}
              >
                {params.smoking ? 'Fumador (+10%)' : 'Cese Verificado'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="space-y-8">
          <div className="glass-card p-10 bg-white/5 flex flex-col justify-between min-h-[340px] relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-full h-1 bg-gradient-to-r from-red-500 to-emerald-500"></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Proyección de Delta de Riesgo</p>
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Actual</span>
                  <span className="text-7xl font-black font-mono text-red-500 tracking-tighter">{calculatedRisk}%</span>
                </div>
                <ChevronRight className="text-slate-700" size={48} strokeWidth={3} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Optimizado</span>
                  <span className="text-7xl font-black font-mono text-cyan-400 tracking-tighter">{optimizedRisk}%</span>
                </div>
              </div>
              <p className="text-slate-400 mt-10 leading-relaxed font-medium">
                Al alcanzar los umbrales de optimización objetivo, el riesgo institucional de PJI para este perfil 
                se reduce en un <span className="text-white font-black underline decoration-cyan-400">{(calculatedRisk - optimizedRisk)}%</span>.
              </p>
            </div>
            <div className="mt-10 p-5 glass bg-emerald-500/5 border-emerald-500/10">
              <div className="flex items-center justify-between font-mono text-emerald-400 font-black tracking-widest text-sm">
                <span>POTENCIAL DE COSTO EVITADO:</span>
                <span className="text-xl underline underline-offset-4">${((calculatedRisk - optimizedRisk) * 1500).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 glass flex items-center justify-center border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                <FileText className="text-cyan-400" size={28} />
              </div>
              <div>
                <h4 className="font-black text-white uppercase tracking-tight">Plan de Optimización</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Listo para firma clínica</p>
              </div>
            </div>
            <button className="px-6 py-3 glass border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white">
              Exportar PDF
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OptimizationSlider({ label, value, min, max, step = 1, onChange, unit, threshold, reverse = false }: { label: string, value: number, min: number, max: number, step?: number, onChange: (v: number) => void, unit: string, threshold: number, reverse?: boolean }) {
  const isCritical = reverse ? value < threshold : value > threshold;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
          <div className="text-xs font-bold text-slate-400">{isCritical ? 'UMBRAL CRÍTICO' : 'RANGO OPTIMIZADO'}</div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-3xl font-black font-mono tracking-tighter", isCritical ? "text-red-400 neon-border" : "text-cyan-400")}>
            {value}
          </span>
          <span className="text-[10px] text-slate-600 font-bold uppercase">{unit}</span>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-400 border border-white/5"
      />
    </div>
  );
}

