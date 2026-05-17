export interface ICreatePromotionAgent {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  focus: string;
  focusType: "B2B" | "B2C" | "Both";
  message: string;
  businessUnits: string[];
}


export interface IUpdateAgentStatus {
  status: "PENDING" | "REVIEWED" | "APPROVED" | "REJECTED";
}

export interface IAgentQuery {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
}