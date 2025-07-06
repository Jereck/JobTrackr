export type Application = {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  applicationSource: string;
  resumeUsed: string;
  status: string;
  salary?: number;
  dateApplied: Date;
  notes?: string;
}