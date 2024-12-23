import { initialState } from "./constants/initials";

export type feedDataType = {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
};

export type status = "NORMAL" | "HIGH" | "ABNORMAL" | "LOW";

export type ReadingDataType = typeof initialState

export type ReadingEvalutedType = {
  text: string,
  status: status
}

export type EvaluateDiseaseType = {
  diseaseDetected: boolean;
  text: string,
  name: string
}