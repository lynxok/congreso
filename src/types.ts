export enum RiskLevel {
  LOW = "Bajo",
  MODERATE = "Moderado",
  HIGH = "Alto",
  CRITICAL = "Crítico"
}

export interface BiomarkerValue {
  value: number;
  unit: string;
  timestamp: string;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  bmi: number;
  hbA1c: number;
  albumin: number;
  eiri: {
    crp: BiomarkerValue[];
    esr: BiomarkerValue[];
    il6: BiomarkerValue[];
    nlr: BiomarkerValue[];
    procalcitonin: BiomarkerValue[];
  };
}

export interface PhiladelphiaCriteria {
  major: {
    fistula: boolean;
    cultureMatch: boolean;
  };
  minor: {
    crp: number;
    esr: number;
    synovialWBC: number;
    pmner: number;
    synovialAlphaDefensin: boolean;
    synovialLE: number;
  };
}

export interface RiskScore {
  score: number;
  level: RiskLevel;
  trend: "improving" | "stable" | "worsening";
  recommendation: string;
}
